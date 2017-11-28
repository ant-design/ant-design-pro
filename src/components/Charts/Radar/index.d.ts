import React from "react";
export interface RadarProps {
  title?: string | React.ReactNode;
  height: number;
  margin?: [number, number, number, number];
  hasLegend?: boolean;
  data: Array<{
    name: string;
    label: string;
    value: string;
  }>;
}

export default class Radar extends React.Component<RadarProps, any> {}
