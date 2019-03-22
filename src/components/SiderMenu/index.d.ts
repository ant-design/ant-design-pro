import React from 'react';

export declare type SiderTheme = 'light' | 'dark';

export interface ISiderMenuProps {
  isMobile: boolean;
  menuData: any[];
  collapsed: boolean;
  logo?: string;
  theme?: SiderTheme;
  onCollapse: (payload: boolean) => void;
}

export default class SiderMenuWrapper extends React.Component<ISiderMenuProps, any> {}
