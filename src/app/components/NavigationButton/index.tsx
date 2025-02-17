import React from 'react';
import classNames from 'classnames';
import style from './style.scss';

export namespace NavigationButton {
  export interface Props {
    className?: string;
    isForward?: boolean;
    onClick: () => void;
    hidden?: boolean;
  }
}

export const NavigationButton = ({ className, hidden = false, onClick, isForward = false}: NavigationButton.Props): JSX.Element => {
  return (
    <a onClick={onClick} className={classNames(style.button, className, { [style.forward]: isForward, [style.hidden]: hidden })}>
      <svg width="23px" height="18px" viewBox="0 0 23 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g id="product-page_color-chooser" transform="translate(-1217.000000, -751.000000)" fill="#FFFFFF">
          <g id="content">
            <g id="navigation-bar" transform="translate(834.000000, 720.000000)">
              <g id="arrows" transform="translate(10.000000, 10.000000)">
                <path d="M381.485281,21 L382.899495,22.4142136 L376.292,29.02 L396.020815,29.0208153 L396.020815,31.0208153 L376.434,31.02 L382.899495,37.4852814 L381.485281,38.8994949 L373,30.4142136 L373.464,29.949 L373,29.4852814 L381.485281,21 Z" id="arrow_right" transform="translate(384.510408, 29.949747) scale(-1, 1) translate(-384.510408, -29.949747) "></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </a>
  );
};
