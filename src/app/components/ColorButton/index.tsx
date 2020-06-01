import React, { useCallback } from 'react';
import classNames from 'classnames';
import style from './style.scss';
import { ColorModel } from 'app/models';

export namespace ColorButton {
  export interface Props {
    data: ColorModel;
    onClick: Function;
    selected?: boolean;
    iconUrl: string;
    className?: string;
  }
}

export const ColorButton = ({ data, data: { name, price }, iconUrl, className, onClick, selected = false }: ColorButton.Props): JSX.Element => {
  const onClickHandler = useCallback(() => onClick(data), [data]);
  return (
    <div className={classNames(style.button, className, { [style.selected]: selected })} onClick={onClickHandler} >
      <img className={style.image} src={iconUrl} alt={name} />
      <div className={style.name}>{name}</div>
      <div className={style.price}>{price === 0 ? 'Standard' : `+${price} kr.`}</div>
    </div>
  );
}
