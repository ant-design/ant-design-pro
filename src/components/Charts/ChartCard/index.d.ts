import * as React from "react";
export interface IChartCardProps {
  title: React.ReactNode;
  action?: React.ReactNode;
  total?: React.ReactNode | function | number;
  footer?: React.ReactNode;
  contentHeight?: number;
  avatar?: React.ReactNode;
  style?: React.CSSProperties;
}

export default class ChartCard extends React.Component<IChartCardProps, any> {}
