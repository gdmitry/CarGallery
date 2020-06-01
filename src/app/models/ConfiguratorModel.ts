import { TrimModel } from './TrimModel';

export interface ConfiguratorModel {
  code: string;
  name: string;
  trims: TrimModel[];
}