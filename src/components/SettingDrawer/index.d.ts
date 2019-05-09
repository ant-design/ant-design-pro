import { SiderTheme } from 'antd/es/Layout/Sider';
import React from 'react';

export interface ISettingModelState {
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

export interface ISettingDrawerProps {
  setting?: ISettingModelState;
  dispatch?: (args: any) => void;
}

export default class SettingDrawer extends React.Component<ISettingDrawerProps, any> {}
