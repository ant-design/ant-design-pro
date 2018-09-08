import * as React from 'react';

// g2已经更新到3.0
// 不带的写了

export interface IAxis {
  title: any;
  line: any;
  gridAlign: any;
  labels: any;
  tickLine: any;
  grid: any;
}

export interface IMiniAreaProps {
  color?: string;
  height: number;
  borderColor?: string;
  line?: boolean;
  animate?: boolean;
  xAxis?: IAxis;
  yAxis?: IAxis;
  data: Array<{
    x: number | string;
    y: number;
  }>;
}

export default class MiniArea extends React.Component<IMiniAreaProps, any> {}
