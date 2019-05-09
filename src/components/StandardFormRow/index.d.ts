import React from 'react';

export interface IStandardFormRowProps {
  title: string;
  last?: boolean;
  block?: boolean;
  grid?: boolean;
  style?: React.CSSProperties;
}

export default class StandardFormRow extends React.Component<IStandardFormRowProps, any> {}
