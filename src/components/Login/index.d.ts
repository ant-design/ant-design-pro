import { WrappedFormUtils } from 'antd/es/form/Form';
import Button from 'antd/lib/button';
import React from 'react';
import LoginItem, { ILoginItemProps, LoginItemType } from './LoginItem';
import LoginSubmit from './LoginSubmit';
import LoginTab from './LoginTab';

export interface ILoginProps {
  defaultActiveKey?: string;
  onTabChange?: (key: string) => void;
  style?: React.CSSProperties;
  onSubmit?: (error: any, values: any) => void;
  className?: string;
}

// interface ILogin extends WrappedFormUtils {}

declare class Login extends React.Component<ILoginProps, any> {
  public static Tab: typeof LoginTab;
  public static UserName: React.FC<ILoginItemProps>;
  public static Password: React.FC<ILoginItemProps>;
  public static Mobile: React.FC<ILoginItemProps>;
  public static Captcha: React.FC<ILoginItemProps>;
  public static Submit: typeof LoginSubmit;
}
export default Login;
