import Button from 'antd/lib/button';
import * as React from 'react';
import LoginItem from './LoginItem';
import LoginTab from './LoginTab';

export interface ILoginProps {
  defaultActiveKey?: string;
  onTabChange?: (key: string) => void;
  style?: React.CSSProperties;
  onSubmit?: (error: any, values: any) => void;
}

export default class Login extends React.Component<ILoginProps, any> {
  public static Tab: typeof LoginTab;
  public static UserName: typeof LoginItem;
  public static Password: typeof LoginItem;
  public static Mobile: typeof LoginItem;
  public static Captcha: typeof LoginItem;
  public static Submit: typeof Button;
}
