import React from 'react';
export interface IMiniProgressProps {
  target: number;
  targetLabel: string;
  color?: string;
  strokeWidth?: number;
  percent?: number;
  style?: React.CSSProperties;
}

export default class MiniProgress extends React.Component<IMiniProgressProps, any> {}
