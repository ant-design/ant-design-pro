import * as React from "react";
export interface WaterWaveProps {
  title: React.ReactNode;
  color?: string;
  height: number;
  percent: number;
}

export default class WaterWave extends React.Component<WaterWaveProps, any> {}
