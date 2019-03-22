import React from 'react';

export interface StandardFormRowProps {
  title: string;
  last?: boolean;
  block?: boolean;
  grid?: boolean;
  style?: React.CSSProperties;
}

export default class StandardFormRow extends React.Component<StandardFormRowProps, any> {}
