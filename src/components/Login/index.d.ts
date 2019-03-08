import Button from 'antd/es/button';
import { WrappedFormUtils } from 'antd/es/form/Form';
import * as React from 'react';
import LoginItem from './LoginItem';
import LoginTab from './LoginTab';

export interface ILoginProps {
  defaultActiveKey?: string;
  onTabChange?: (key: string) => void;
  style?: React.CSSProperties;
  onSubmit?: (error: any, values: any) => void;
}

interface Login extends React.Component<ILoginProps>, WrappedFormUtils {}

declare class Login extends React.Component<ILoginProps> {
  public static Tab: typeof LoginTab;
  public static UserName: typeof LoginItem;
  public static Password: typeof LoginItem;
  public static Mobile: typeof LoginItem;
  public static Captcha: typeof LoginItem;
  public static Submit: typeof Button;
}

export default Login;
