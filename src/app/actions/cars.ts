import { useMemo } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { createAction } from 'redux-actions';
import { CarModel } from 'app/models/CarModel';
import createAsyncAction from 'app/utils/createAsyncAction';
import { makeCarsRequest } from 'app/utils/api';

export namespace CarActions {
  export enum Type {
    CARS_REQUESTED = 'CARS_REQUESTED',
    CARS_FAILED = 'CARS_FAILED',
    CARS_SUCCEDED = 'CARS_SUCCEDED',
  }

  export const carsRequested = createAction(Type.CARS_REQUESTED);
  export const carsSucceded = createAction<CarModel[]>(Type.CARS_SUCCEDED);
  export const carsFailed = createAction<Error>(Type.CARS_FAILED);
  export const requestCars = createAsyncAction(
    makeCarsRequest,
    carsRequested,
    carsSucceded,
    carsFailed
  );
}

export type CarActions = Omit<typeof CarActions, 'Type'>;
export const useCarActions = (dispatch: Dispatch) => {
  const { Type, ...actions } = CarActions;
  return useMemo(() => bindActionCreators(actions as any, dispatch), [dispatch]) as CarActions;
};
