import React, { useState, useCallback } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import classNames from 'classnames';
import style from './style.scss';
import { NavigationButton, CheckoutButton } from 'app/components';

export namespace InteractionPanel {
  export interface Props extends RouteComponentProps<void> {
    onComplete: () => void;
    steps: JSX.Element[];
    className?: string;
    step: number;
    code: string | undefined;
  }
}

export const InteractionPanel = withRouter(({ history, className, code, onComplete, steps, step = 0 }: InteractionPanel.Props) => {
  const [stepIndex, setStepIndex] = useState(step);
  const goBack = useCallback(() => {
    setStepIndex(stepIndex - 1);
    history.goBack();
  }, [steps]);

  const goForward = useCallback(() => {
    setStepIndex(stepIndex + 1);
    history.push(`/models/${code}/colors`);
  }, [steps]);

  if (!code) return null;

  const readyForCheckout = stepIndex === steps.length - 1;

  return (
    <div className={classNames(className, style.panel)}>
      {steps[stepIndex]}
      <div className={style.navigationBar}>
        <NavigationButton onClick={goBack}/>
        {readyForCheckout && <CheckoutButton name="PROCEED" onClick={onComplete} />}
        <NavigationButton isForward onClick={goForward} hidden={readyForCheckout} />
      </div>
    </div>
  );
});