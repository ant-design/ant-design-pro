import React from 'react';
export interface FooterToolbarProps {
  extra: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default class FooterToolbar extends React.Component<FooterToolbarProps, any> {}
