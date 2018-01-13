import * as React from "react";
export interface GaugeProps {
  title: React.ReactNode;
  color?: string;
  height: number;
  bgColor?: number;
  percent: number;
  style?: React.CSSProperties;
}

export default class Gauge extends React.Component<GaugeProps, any> {}
