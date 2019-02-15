import * as React from 'react';
export interface ILoginItemProps {
  name?: string;
  rules?: any[];
  style?: React.CSSProperties;
  onGetCaptcha?: () => void;
  placeholder?: string;
  buttonText?: React.ReactNode;
}

export default class LoginItem extends React.Component<ILoginItemProps, any> {}
