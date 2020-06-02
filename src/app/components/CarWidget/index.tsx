import React from 'react';
import classNames from 'classnames';
import style from './style.scss';
import { formatCurrency } from 'app/utils';

export namespace CarWidget {
  export interface Props {
    imageUrl: string;
    model: string;
    color: string;
    className?: string;
    price: number;
    trim: string;
  }
}

export const CarWidget = ({ className, model, trim, imageUrl, color, price }: CarWidget.Props): JSX.Element => {
  return (
    <div className={classNames(style.widget, className)}>
       <div className={style.text}> 
        <div className={style.model}><b>{model}</b>{` ${trim}`}</div>
        <div className={style.color}>{color}</div>
      </div>
      <img className={style.image} src={imageUrl} alt={model} />
      <div className={style.price}>{formatCurrency(price)}</div>
    </div>
  );
};
