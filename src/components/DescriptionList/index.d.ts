import React from 'react';
import Description, { DescriptionProps } from './Description';

export interface DescriptionListProps {
  className?: string;
  col?: number;
  description?: DescriptionProps[];
  gutter?: number;
  layout?: 'horizontal' | 'vertical';
  size?: 'large' | 'small';
  style?: React.CSSProperties;
  title?: React.ReactNode;
}

export default class DescriptionList extends React.Component<DescriptionListProps, any> {
  public static Description: typeof Description;
}
