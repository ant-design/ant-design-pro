import React from 'react';
export interface ResultProps {
  actions?: React.ReactNode;
  className?: string;
  description?: React.ReactNode;
  extra?: React.ReactNode;
  style?: React.CSSProperties;
  title?: React.ReactNode;
  type: 'success' | 'error';
}

export default class Result extends React.Component<ResultProps, any> {}
