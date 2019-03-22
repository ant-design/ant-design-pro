import React from 'react';
import { SiderTheme } from 'antd/es/Layout/Sider';

export interface SiderMenuProps {
  isMobile: boolean;
  menuData: any[];
  collapsed: boolean;
  logo?: string;
  theme?: SiderTheme;
  onCollapse: (payload: boolean) => void;
}

export default class SiderMenuWrapper extends React.Component<SiderMenuProps, any> {}
