import React, { memo } from 'react';
import { sortBy } from 'lodash';
import { ColorModel } from 'app/models';
import { ColorButton } from 'app/components';
import style from './style.scss';

export namespace ColorPanel {
  export interface Props {
    name: string;
    colors: ColorModel[];
    setColor: Function;
    className?: string;
  }
}

const Panel = ({ colors, name, setColor, className }: ColorPanel.Props): JSX.Element => {
  const colorItems = sortBy(colors, ['price']).map((item: ColorModel) => <ColorButton className={style.button} iconUrl={item.iconUrl} key={item.name} selected={item.name === name} data={item} onClick={setColor} />)
  return <div className={className}>
    <h1 className={style.title}>SELECT COLOR</h1>
    <div className={style.content}>{colorItems}</div>
  </div>
};

export const ColorPanel = memo(Panel);