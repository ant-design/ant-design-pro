import * as React from 'react';
export interface MiniBarProps {
  color?: string;
  height: number;
  data: Array<{
    x: number | string;
    y: number;
  }>;
  style?: React.CSSProperties;
}

export default class MiniBar extends React.Component<MiniBarProps, any> {}
