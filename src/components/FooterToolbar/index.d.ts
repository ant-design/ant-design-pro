import React from 'react';
export interface IFooterToolbarProps {
  extra: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default class FooterToolbar extends React.Component<IFooterToolbarProps, any> {}
