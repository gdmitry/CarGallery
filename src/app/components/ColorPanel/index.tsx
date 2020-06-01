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
  }
}

const Panel = ({ colors, name, setColor }: ColorPanel.Props): JSX.Element => {
  const colorItems = sortBy(colors, ['price']).map((item: ColorModel) => <ColorButton className={style.button} iconUrl={item.iconUrl} key={item.name} selected={item.name === name} data={item} onClick={setColor} />)
  return <div>
    <div className={style.title}>SELECT COLOR</div>
    <div className={style.content}>{colorItems}</div>
  </div>
};

export const ColorPanel = memo(Panel);