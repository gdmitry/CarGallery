import React, { memo } from 'react';
import { sortBy } from 'lodash';
import { TrimModel } from 'app/models';
import { TrimButton } from 'app/components';
import style from './style.scss';

export namespace TrimsPanel {
  export interface Props {
    name: string;
    trims: TrimModel[];
    setTrim: Function;
  }
}

const Panel = ({ trims, name, setTrim }: TrimsPanel.Props): JSX.Element => {
  const trimItems = sortBy(trims, ['price']).map((item: TrimModel) => <TrimButton key={item.name} selected={item.name === name} data={item} onClick={setTrim} />)
  return <div>
    <div className={style.title}>CHOOSE EQUIPMENT LEVEL</div>
    <div className={style.content}>{trimItems}</div>
  </div>
};

export const TrimsPanel = memo(Panel);