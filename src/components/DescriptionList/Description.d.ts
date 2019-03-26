import React from 'react';
import { ColProps } from 'antd/es/col';

export interface DescriptionProps extends ColProps {
  column?: number;
  key?: string | number;
  style?: React.CSSProperties;
  term?: React.ReactNode;
}

export default class Description extends React.Component<DescriptionProps, any> {}
