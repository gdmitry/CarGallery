import React, { useCallback } from 'react';
import classNames from 'classnames';
import style from './style.scss';
import { TrimModel } from 'app/models';

export namespace TrimButton {
  export interface Props {
    data: TrimModel;
    onClick: Function;
    selected?: boolean;
  }
}

export const TrimButton = ({ data, data: { name, price }, onClick, selected = false }: TrimButton.Props): JSX.Element => {
  const onClickHandler = useCallback(() => onClick(data), [data]);
  return (
    <button className={classNames(style.button, { [style.selected]: selected })} onClick={onClickHandler} >
      <div className={style.name}>{name}</div>
      <div className={style.price}>{`${price} kr.`}</div>
    </button>
  );
}
