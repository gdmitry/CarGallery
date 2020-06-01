import { CarModel, ConfiguratorModel } from 'app/models';
import { BrowserRouter } from 'react-router-dom';

export interface RootState {
  cars: RootState.Cars;
  configurator: RootState.Configurator;
  router?: BrowserRouter;
}

export interface  DataLoadStatus {
  error?: Error | null;
  isLoading: boolean;
}

export interface CarState extends DataLoadStatus {
  data: CarModel[];
}

export interface ConfiguratorState extends DataLoadStatus {
  data: ConfiguratorModel;
}

export namespace RootState {
  export type Cars = CarState;
  export type Configurator = ConfiguratorState;
}
