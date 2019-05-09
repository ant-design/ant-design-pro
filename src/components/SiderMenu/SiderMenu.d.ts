import { SiderTheme } from 'antd/es/Layout/Sider';
import * as H from 'history';
import React from 'react';
import { IBaseMenuProps } from './BaseMenu';

export interface ISiderMenuProps extends IBaseMenuProps {
  logo?: string;
  fixSiderbar?: boolean;
}

export default class SiderMenu extends React.Component<ISiderMenuProps, any> {}
