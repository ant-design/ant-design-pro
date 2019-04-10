import React from 'react';
import * as H from 'history';
import { BaseMenuProps } from './BaseMenu';
import { SiderTheme } from 'antd/es/Layout/Sider';

export interface SiderMenuProps extends BaseMenuProps {
  logo?: string;
  fixSiderbar?: boolean;
}

export default class SiderMenu extends React.Component<SiderMenuProps, any> {}
