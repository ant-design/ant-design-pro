import React from 'react';
export interface ICountDownProps {
  format?: (time: number) => void;
  target: Date | number;
  onEnd?: () => void;
  style?: React.CSSProperties;
}

export default class CountDown extends React.Component<ICountDownProps, any> {}
