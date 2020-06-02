import React from 'react';
import style from './style.scss';

export namespace CheckoutButton {
  export interface Props {
    onClick: () => void;
    name: string;
  }
}

export const CheckoutButton = ({ onClick, name }: CheckoutButton.Props): JSX.Element =>
  (
    <button className={style.button} onClick={onClick} >
      {name}
    </button>
  );
