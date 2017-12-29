import * as React from "react";
export interface TimelineChartProps {
  data: Array<{
    x: string;
    y1: string;
    y2: string;
  }>;
  titleMap: { y1: string; y2: string };
  padding?: [number, number, number, number];
  height?: number;
}

export default class TimelineChart extends React.Component<
  TimelineChartProps,
  any
> {}
