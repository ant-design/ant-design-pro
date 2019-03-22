import React from 'react';

export interface TagProps {
  color: string;
  check: boolean;
  className?: string;
  onClick?: () => void;
}

export default class ThemeColor extends React.Component<TagProps, any> {}
