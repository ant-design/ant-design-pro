import React from "react";
export interface GaugeProps {
  title: string | React.ReactNode;
  color?: string;
  height: number;
  bgColor?: number;
  percent: number;
}

export default class Gauge extends React.Component<GaugeProps, any> {}
