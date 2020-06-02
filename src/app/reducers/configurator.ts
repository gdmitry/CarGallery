import { handleActions } from 'redux-actions';
import { RootState, } from './state';
import { ConfiguratorActions } from 'app/actions';

const initialState: RootState.Configurator = {
  data: {
    code: '',
    name: '',
    trims: []
  },
  isLoading: false,
  error: null
}

export const configuratorReducer = handleActions<RootState.Configurator, any>(
  {
    [ConfiguratorActions.Type.CONFIGURATION_REQUESTED]: (state) => {
      return { ...state, isLoading: true };
    },
    [ConfiguratorActions.Type.CONFIGURATION_SUCCEDED]: (state, action) => {
      return { ...state, isLoading: false, data: action.payload };
    },
    [ConfiguratorActions.Type.CONFIGURATION_FAILED]: (state, action) => {
      return { ...state, isLoading: false, error: action.payload };
    },
    [ConfiguratorActions.Type.CHECKOUT_REQUESTED]: (state) => {
      return { ...state, isLoading: true };
    },
    [ConfiguratorActions.Type.CHECKOUT_COMPLETED]: (state) => {
      return { ...state, isLoading: false };
    },
  },
  initialState
);
