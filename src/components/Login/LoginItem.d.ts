import React from 'react';
import { WrappedFormUtils } from 'antd/es/form/Form';
import ItemMap from './map';
import { Omit } from 'antd/es/_util/type';

export type WrappedLoginItemProps = Omit<LoginItemProps, 'form' | 'type' | 'updateActive'>;
export type LoginItemType = { [K in keyof typeof ItemMap]: React.FC<WrappedLoginItemProps> };

export interface LoginItemProps {
  name?: string;
  rules?: any[];
  style?: React.CSSProperties;
  onGetCaptcha?: (event?: MouseEvent) => void;
  placeholder?: string;
  buttonText?: React.ReactNode;
  onPressEnter?: (e: any) => void;
  countDown?: number;
  getCaptchaButtonText?: string;
  getCaptchaSecondText?: string;
  updateActive: (activeItem: any) => void;
  form: WrappedFormUtils;
  type: string;
  defaultValue?: string;
  customprops?: any;
  onChange?: (e: any) => void;
}

export default class LoginItem extends React.Component<LoginItemProps, any> {}
