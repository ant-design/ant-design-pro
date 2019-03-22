import React from 'react';

export declare type CollapseType = 'clickTrigger' | 'responsive';
export declare type SiderTheme = 'light' | 'dark';
export declare type MenuMode =
  | 'vertical'
  | 'vertical-left'
  | 'vertical-right'
  | 'horizontal'
  | 'inline';

export interface ITopNavHeaderProps {
  theme: SiderTheme;
  contentWidth?: string;
  menuData?: any[];
  logo?: string;
  mode?: MenuMode;
  flatMenuKeys?: any[];
  onCollapse?: (collapsed: boolean, type?: CollapseType) => void;
  isMobile?: boolean;
  openKeys?: any;
  className?: string;
  collapsed?: boolean;
  handleOpenChange?: (openKeys: any[]) => void;
  style?: React.CSSProperties;
  onOpenChange?: (openKeys: string[]) => void;
  onNoticeClear?: (type: string) => void;
  onMenuClick?: ({ key: string }) => void;
  onNoticeVisibleChange?: (b: boolean) => void;
}

export default class TopNavHeader extends React.Component<ITopNavHeaderProps, any> {}
