import React from 'react';
import ReactLoader from 'react-loader-spinner';
import style from './style.scss';

export const Loader = () =>
  (
    <div className={style.loader}>
      <ReactLoader
        type='Grid'
        color='#00BFFF'
        height={100}
        width={100}
      />
    </div>
  );
