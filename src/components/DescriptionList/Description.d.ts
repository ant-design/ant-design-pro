import { ColProps } from 'antd/es/col';
import React from 'react';

export interface IDescriptionProps extends ColProps {
  column?: number;
  key?: string | number;
  style?: React.CSSProperties;
  term?: React.ReactNode;
}

export default class Description extends React.Component<IDescriptionProps, any> {}
