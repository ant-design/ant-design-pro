import * as React from "react";
export interface BarProps {
  title: React.ReactNode;
  color?: string;
  padding?: [number, number, number, number];
  height: number;
  data: Array<{
    x: string;
    y: number;
  }>;
  autoLabel?: boolean;
}

export default class Bar extends React.Component<BarProps, any> {}
