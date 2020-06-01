import { combineReducers } from 'redux';
import { RootState } from './state';
import { carReducer } from './cars';
import { configuratorReducer } from './configurator';

export { RootState };

export const rootReducer = combineReducers<RootState>({
  cars: carReducer,
  configurator: configuratorReducer
});
