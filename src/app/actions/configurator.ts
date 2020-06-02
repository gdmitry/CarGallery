import { useMemo } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { createAction } from 'redux-actions';
import { CarModel } from 'app/models/CarModel';
import createAsyncAction from 'app/utils/createAsyncAction';
import { makeCarConfigurationRequest, makeCheckoutRequest } from 'app/utils/api';
import { CheckoutModel } from 'app/models';

export namespace ConfiguratorActions {
  export enum Type {
    CONFIGURATION_REQUESTED = 'CONFIGURATION_REQUESTED',
    CONFIGURATION_FAILED = 'CONFIGURATION_FAILED',
    CONFIGURATION_SUCCEDED = 'CONFIGURATION_SUCCEDED',
    CHECKOUT_REQUESTED = 'CHECKOUT_REQUESTED',
    CHECKOUT_COMPLETED = 'CHECKOUT_COMPLETED'
  }

  export const configurationRequested = createAction(Type.CONFIGURATION_REQUESTED);
  export const configurationSucceded = createAction<CarModel[]>(Type.CONFIGURATION_SUCCEDED);
  export const configurationFailed = createAction<Error>(Type.CONFIGURATION_FAILED);
  export const requestCarConfiguration = createAsyncAction(
    makeCarConfigurationRequest,
    configurationRequested,
    configurationSucceded,
    configurationFailed
  );
  export const checkoutRequested = createAction<CheckoutModel>(Type.CHECKOUT_REQUESTED);
  export const checkoutCompleted = createAction<CheckoutModel>(Type.CHECKOUT_COMPLETED);
  export const checkoutCarConfiguration = createAsyncAction(
    makeCheckoutRequest,
    checkoutRequested,
    checkoutCompleted,
    checkoutCompleted
  );
}

export type ConfiguratorActions = Omit<typeof ConfiguratorActions, 'Type'>;
export const useConfiguratorActions = (dispatch: Dispatch) => {
  const { Type, ...actions } = ConfiguratorActions;
  return useMemo(() => bindActionCreators(actions as any, dispatch), [dispatch]) as ConfiguratorActions;
};
