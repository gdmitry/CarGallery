import React from 'react';
import style from './style.scss';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { SuccessIcon, FailedIcon } from 'app/components';

export namespace Checkout {
  export interface Props extends RouteComponentProps<void> {}
}

export const Checkout = (props: Checkout.Props): JSX.Element => {
  const { status } = useParams();

  return (
    <div className={style.page}>
      {status === 'success' && <SuccessIcon />}
      {status === 'failed' && <FailedIcon />}
    </div>
  );
};
