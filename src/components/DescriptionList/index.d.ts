import * as React from 'react';
import Description from './Description';

export interface IDescriptionListProps {
  layout?: 'horizontal' | 'vertical';
  col?: number;
  title: React.ReactNode;
  gutter?: number;
  size?: 'large' | 'small';
  style?: React.CSSProperties;
}

export default class DescriptionList extends React.Component<IDescriptionListProps, any> {
  public static Description: typeof Description;
}
