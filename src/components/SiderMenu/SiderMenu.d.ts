import * as React from 'react';
import * as H from 'history';

export declare type CollapseType = 'clickTrigger' | 'responsive';
export declare type SiderTheme = 'light' | 'dark';

export interface SiderMenuProps {
  menuData: any[];
  location?: H.Location;
  flatMenuKeys?: any[];
  logo?: string;
  collapsed: boolean;
  onCollapse: (collapsed: boolean, type?: CollapseType) => void;
  fixSiderbar?: boolean;
  theme?: SiderTheme;
  isMobile: boolean;
}

export default class SiderMenu extends React.Component<SiderMenuProps, any> {}
