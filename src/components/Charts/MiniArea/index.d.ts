import * as React from "react";

// g2已经更新到3.0
// 不带的写了

export interface Axis {
  title: any;
  line: any;
  gridAlign: any;
  labels: any;
  tickLine: any;
  grid: any;
}

export interface MiniAreaProps {
  color?: string;
  height: number;
  borderColor?: string;
  line?: boolean;
  animate?: boolean;
  xAxis?: Axis;
  yAxis?: Axis;
  data: Array<{
    x: number;
    y: number;
  }>;
}

export default class MiniArea extends React.Component<MiniAreaProps, any> {}
