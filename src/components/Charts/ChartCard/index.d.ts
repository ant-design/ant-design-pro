import { CardProps } from 'antd/lib/card';
import React from 'react';

export interface IChartCardProps extends CardProps {
  title: React.ReactNode;
  action?: React.ReactNode;
  total?: React.ReactNode | number | (() => React.ReactNode | number);
  footer?: React.ReactNode;
  contentHeight?: number;
  avatar?: React.ReactNode;
  style?: React.CSSProperties;
}

export default class ChartCard extends React.Component<IChartCardProps, any> {}
