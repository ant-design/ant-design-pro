import * as React from "react";
export interface CountDownProps {
  format?: (time: number) => void;
  target: Date | number;
  onEnd?: () => void;
  style?: React.CSSProperties;
}

export default class CountDown extends React.Component<CountDownProps, any> {}
