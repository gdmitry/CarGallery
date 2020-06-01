import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import style from './style.scss';

export namespace CarItem {
  export interface Props {
    imageUrl: string;
    title: string;
    price: number;
    linkTo: string;
    className?: string
  }
}

export const CarItem = ({ className, title, imageUrl, price, linkTo }: CarItem.Props): JSX.Element => {
  return (
    <Link to={{ pathname: linkTo }} className={classNames(style.item, className)}>
      <img className={style.image} src={imageUrl} alt={title} />
      <div className={style.text}> 
        <div className={style.model}>{title}</div>
        <div className={style.price}>{price}</div>
      </div>
    </Link>
  );
};
