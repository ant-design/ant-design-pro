import React from 'react';
import Description, { IDescriptionProps } from './Description';

export interface IDescriptionListProps {
  className?: string;
  col?: number;
  description?: IDescriptionProps[];
  gutter?: number;
  layout?: 'horizontal' | 'vertical';
  size?: 'large' | 'small';
  style?: React.CSSProperties;
  title?: React.ReactNode;
}

export default class DescriptionList extends React.Component<IDescriptionListProps, any> {
  public static Description: typeof Description;
}
