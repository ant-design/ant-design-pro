import * as React from 'react';
export interface DescriptionListProps {
  layout?: 'horizontal' | 'vertical';
  col?: number;
  title: React.ReactNode;
  gutter?: number;
  size?: 'large' | 'small';
  style?: React.CSSProperties;
}

declare class Description extends React.Component<
  {
    term: React.ReactNode;
    style?: React.CSSProperties;
  },
  any
> {}

export default class DescriptionList extends React.Component<
  DescriptionListProps,
  any
> {
  static Description: typeof Description;
}
