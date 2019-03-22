import React from 'react';

export declare type SiderTheme = 'light' | 'dark';

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
