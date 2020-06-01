import React, { useState } from 'react';
import classNames from 'classnames';
import style from './style.scss';

export namespace InteractionPanel {
  export interface Props {
    onComplete: () => void;
    steps: JSX.Element[];
    className?: string;
    step: number;
  }
}

export const InteractionPanel = ({ className, onComplete, steps, step = 0 }: InteractionPanel.Props): JSX.Element => {
  const [stepIndex, setStepIndex] = useState(step);

  return (
    <div className={classNames(className, style.panel)}>
      {steps[stepIndex]}
    </div>
  );
};
