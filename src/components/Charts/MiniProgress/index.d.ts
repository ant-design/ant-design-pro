import * as React from 'react';
export interface IMiniProgressProps {
  target: number;
  color?: string;
  strokeWidth?: number;
  percent?: number;
  style?: React.CSSProperties;
}

export default class MiniProgress extends React.Component<IMiniProgressProps, any> {}
