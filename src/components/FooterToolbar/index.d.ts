import * as React from 'react';
export interface IFooterToolbarProps {
  extra: React.ReactNode;
  style?: React.CSSProperties;
}

export default class FooterToolbar extends React.Component<IFooterToolbarProps, any> {}
