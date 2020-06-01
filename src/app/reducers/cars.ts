import { handleActions } from 'redux-actions';
import { RootState, } from './state';
import { CarActions } from 'app/actions';

const initialState: RootState.Cars = {
  data: [],
  isLoading: false,
  error: null
}

export const carReducer = handleActions<RootState.Cars, any>(
  {
    [CarActions.Type.CARS_REQUESTED]: (state) => {
      return { ...state, isLoading: true };
    },
    [CarActions.Type.CARS_SUCCEDED]: (state, action) => {
      return { ...state, isLoading: false, data: action.payload };
    },
    [CarActions.Type.CARS_FAILED]: (state, action) => {
      return { ...state, isLoading: false, error: action.payload };
    },
  },
  initialState
);
