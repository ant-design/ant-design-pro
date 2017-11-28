import React from "react";
export interface ChartCardProps {
  title: string | React.ReactNode;
  action?: React.ReactNode;
  total?: React.ReactNode | number;
  footer?: React.ReactNode;
  contentHeight: number;
  avatar?: React.ReactNode;
}

export default class ChartCard extends React.Component<ChartCardProps, any> {}
