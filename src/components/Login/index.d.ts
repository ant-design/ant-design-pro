import * as React from 'react';
import Button from 'antd/lib/button';
export interface LoginProps {
  defaultActiveKey?: string;
  onTabChange?: (key: string) => void;
  style?: React.CSSProperties;
  onSubmit?: (error: any, values: any) => void;
}

export interface TabProps {
  key?: string;
  tab?: React.ReactNode;
}
export class Tab extends React.Component<TabProps, any> {}

export interface LoginItemProps {
  name?: string;
  rules?: any[];
  style?: React.CSSProperties;
  onGetCaptcha?: () => void;
}

export class LoginItem extends React.Component<LoginItemProps, any> {}

export default class Login extends React.Component<LoginProps, any> {
  static Tab: typeof Tab;
  static UserName: typeof LoginItem;
  static Password: typeof LoginItem;
  static Mobile: typeof LoginItem;
  static Captcha: typeof LoginItem;
  static Submit: typeof Button;
}
