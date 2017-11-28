import React from "react";
export interface WaterWaveProps {
  title: string | React.ReactNode;
  color?: string;
  height: number;
  percent: number;
}

export default class WaterWave extends React.Component<WaterWaveProps, any> {}
