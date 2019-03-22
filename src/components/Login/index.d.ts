import Button from 'antd/lib/button';
import React from 'react';
import LoginItem, { LoginItemProps, LoginItemType } from './LoginItem';
import LoginTab from './LoginTab';
import { WrappedFormUtils } from 'antd/es/form/Form';
import LoginSubmit from './LoginSubmit';

export interface LoginProps {
  defaultActiveKey?: string;
  onTabChange?: (key: string) => void;
  style?: React.CSSProperties;
  onSubmit?: (error: any, values: any) => void;
  className?: string;
}

interface Login extends WrappedFormUtils {}
declare class Login extends React.Component<LoginProps, any> {
  public static Tab: typeof LoginTab;
  public static UserName: React.FC<LoginItemProps>;
  public static Password: React.FC<LoginItemProps>;
  public static Mobile: React.FC<LoginItemProps>;
  public static Captcha: React.FC<LoginItemProps>;
  public static Submit: typeof LoginSubmit;
}
export default Login;
