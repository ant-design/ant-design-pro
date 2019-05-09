import { SiderTheme } from 'antd/es/Layout/Sider';
import * as H from 'history';
import React from 'react';
import { BaseMenuProps } from './BaseMenu';

export interface SiderMenuProps extends BaseMenuProps {
  logo?: string;
  fixSiderbar?: boolean;
}

export default class SiderMenu extends React.Component<SiderMenuProps, any> {}
