import React from 'react';
import { SiderTheme, CollapseType } from 'antd/es/Layout/Sider';
import { MenuMode } from 'antd/es/menu';

export interface TopNavHeaderProps {
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

export default class TopNavHeader extends React.Component<TopNavHeaderProps, any> {}
