import React from 'react';
import * as H from 'history';

export declare type CollapseType = 'clickTrigger' | 'responsive';
export declare type SiderTheme = 'light' | 'dark';
export declare type MenuMode =
  | 'vertical'
  | 'vertical-left'
  | 'vertical-right'
  | 'horizontal'
  | 'inline';

export interface BaseMenuProps {
  flatMenuKeys?: any[];
  location?: H.Location;
  onCollapse?: (collapsed: boolean, type?: CollapseType) => void;
  isMobile?: boolean;
  openKeys?: any;
  theme?: SiderTheme;
  mode?: MenuMode;
  className?: string;
  collapsed?: boolean;
  handleOpenChange?: (openKeys: any[]) => void;
  menuData?: any[];
  style?: React.CSSProperties;
  onOpenChange?: (openKeys: string[]) => void;
}

export default class BaseMenu extends React.Component<BaseMenuProps, any> {}
