import * as React from "react";
export interface MiniProgressProps {
  target: number;
  color?: string;
  strokeWidth?: number;
  percent?: number;
}

export default class MiniProgress extends React.Component<
  MiniProgressProps,
  any
> {}
