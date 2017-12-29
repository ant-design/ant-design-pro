import * as React from "react";

// g2 has been updated to 3.0
// Not yet implemented

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
