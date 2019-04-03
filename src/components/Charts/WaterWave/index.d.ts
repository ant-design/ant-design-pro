import React from 'react';
export interface IWaterWaveProps {
  title: React.ReactNode;
  color?: string;
  height: number;
  percent: number;
  style?: React.CSSProperties;
}

export default class WaterWave extends React.Component<IWaterWaveProps, any> {}
