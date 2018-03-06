import * as React from 'react';

export interface TrendProps {
  colorful?: boolean;
  flag: 'up' | 'down';
  style?: React.CSSProperties;
}

export default class Trend extends React.Component<TrendProps, any> {}
