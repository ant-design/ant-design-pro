import React from "react";
export interface BarProps {
  title: string | React.ReactNode;
  color?: string;
  margin?: [number, number, number, number];
  height: number;
  data: Array<{
    x: string;
    y: number;
  }>;
  autoLabel?: boolean;
}

export default class Bar extends React.Component<BarProps, any> {}
