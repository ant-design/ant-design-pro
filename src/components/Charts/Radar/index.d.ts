import * as React from "react";
export interface IRadarProps {
  title?: React.ReactNode;
  height: number;
  padding?: [number, number, number, number];
  hasLegend?: boolean;
  data: Array<{
    name: string;
    label: string;
    value: string;
  }>;
  style?: React.CSSProperties;
}

export default class Radar extends React.Component<IRadarProps, any> {}
