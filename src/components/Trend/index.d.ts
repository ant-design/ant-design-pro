import * as React from "react";

export interface TrendProps {
  colorful?: boolean;
  flag: "up" | "down";
}

export default class Trend extends React.Component<TrendProps, any> {}
