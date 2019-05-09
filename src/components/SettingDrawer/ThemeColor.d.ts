import React from 'react';

export interface ITagProps {
  color: string;
  check: boolean;
  className?: string;
  onClick?: () => void;
}

export default class ThemeColor extends React.Component<ITagProps, any> {}
