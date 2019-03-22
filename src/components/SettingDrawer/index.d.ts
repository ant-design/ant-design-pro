import React from 'react';
import { SiderTheme } from 'antd/es/Layout/Sider';

export interface SettingModelState {
  navTheme: string | SiderTheme;
  primaryColor: string;
  layout: string;
  contentWidth: string;
  fixedHeader: boolean;
  autoHideHeader: boolean;
  fixSiderbar: boolean;
  menu: { disableLocal: boolean };
  title: string;
  pwa: boolean;
  iconfontUrl: string;
  colorWeak: boolean;
}

export interface SettingDrawerProps {
  setting?: SettingModelState;
  dispatch?: (args: any) => void;
}

export default class SettingDrawer extends React.Component<SettingDrawerProps, any> {}
