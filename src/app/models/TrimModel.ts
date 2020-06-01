import { ColorModel } from './ColorModel';

export interface TrimModel {
  name: string;
  price: number;
  colors: ColorModel[] | [];
}