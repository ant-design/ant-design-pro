import { CollapseType, SiderTheme } from 'antd/es/Layout/Sider';
import * as H from 'history';
import React from 'react';

import { MenuMode } from 'antd/es/menu';

export interface IBaseMenuProps {
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

export default class BaseMenu extends React.Component<IBaseMenuProps, any> {}
