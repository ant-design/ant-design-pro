import { Button, Col, Input, Row, Form, message } from 'antd';
import React, { Component } from 'react';

import omit from 'omit.js';
import { FormItemProps } from 'antd/es/form/FormItem';
import ItemMap from './map';
import LoginContext, { LoginContextProps } from './LoginContext';
import styles from './index.less';
import { getFakeCaptcha } from '@/services/login';

export type WrappedLoginItemProps = LoginItemProps;
export type LoginItemKeyType = keyof typeof ItemMap;
export interface LoginItemType {
  UserName: React.FC<WrappedLoginItemProps>;
  Password: React.FC<WrappedLoginItemProps>;
  Mobile: React.FC<WrappedLoginItemProps>;
  Captcha: React.FC<WrappedLoginItemProps>;
}

export interface LoginItemProps extends Partial<FormItemProps> {
  name?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  buttonText?: React.ReactNode;
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  countDown?: number;
  getCaptchaButtonText?: string;
  getCaptchaSecondText?: string;
  updateActive?: LoginContextProps['updateActive'];
  type?: string;
  defaultValue?: string;
  customProps?: { [key: string]: unknown };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tabUtil?: LoginContextProps['tabUtil'];
}

interface LoginItemState {
  count: number;
}

const FormItem = Form.Item;

class WrapFormItem extends Component<LoginItemProps, LoginItemState> {
  interval: number | undefined = undefined;

  static defaultProps = {
    getCaptchaButtonText: 'captcha',
    getCaptchaSecondText: 'second',
  };

  constructor(props: LoginItemProps) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    const { updateActive, name = '' } = this.props;
    if (updateActive) {
      updateActive(name);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = async (mobile: string) => {
    const result = await getFakeCaptcha(mobile);
    if (result === false) {
      return;
    }
    message.success('获取验证码成功！验证码为：1234');
    this.runGetCaptchaCountDown();
  };

  getFormItemOptions = ({ onChange, defaultValue, customProps = {}, rules }: LoginItemProps) => {
    const options: {
      rules?: LoginItemProps['rules'];
      onChange?: LoginItemProps['onChange'];
      initialValue?: LoginItemProps['defaultValue'];
    } = {
      rules: rules || (customProps.rules as LoginItemProps['rules']),
    };
    if (onChange) {
      options.onChange = onChange;
    }
    if (defaultValue) {
      options.initialValue = defaultValue;
    }
    return options;
  };

  runGetCaptchaCountDown = () => {
    const { countDown } = this.props;
    let count = countDown || 59;
    this.setState({ count });
    this.interval = window.setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  render() {
    const { count } = this.state;

    // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props tabUtil
    const {
      onChange,
      customProps,
      defaultValue,
      rules,
      name,
      getCaptchaButtonText,
      getCaptchaSecondText,
      updateActive,
      type,
      tabUtil,
      ...restProps
    } = this.props;
    if (!name) {
      return null;
    }
    // get getFieldDecorator props
    const options = this.getFormItemOptions(this.props);
    const otherProps = restProps || {};

    if (type === 'Captcha') {
      const inputProps = omit(otherProps, ['onGetCaptcha', 'countDown']);

      return (
        <FormItem shouldUpdate>
          {({ getFieldValue }) => (
            <Row gutter={8}>
              <Col span={16}>
                <FormItem name={name} {...options}>
                  <Input {...customProps} {...inputProps} />
                </FormItem>
              </Col>
              <Col span={8}>
                <Button
                  disabled={!!count}
                  className={styles.getCaptcha}
                  size="large"
                  onClick={() => {
                    const value = getFieldValue('mobile');
                    this.onGetCaptcha(value);
                  }}
                >
                  {count ? `${count} ${getCaptchaSecondText}` : getCaptchaButtonText}
                </Button>
              </Col>
            </Row>
          )}
        </FormItem>
      );
    }
    return (
      <FormItem name={name} {...options}>
        <Input {...customProps} {...otherProps} />
      </FormItem>
    );
  }
}

const LoginItem: Partial<LoginItemType> = {};

Object.keys(ItemMap).forEach(key => {
  const item = ItemMap[key];
  LoginItem[key] = (props: LoginItemProps) => (
    <LoginContext.Consumer>
      {context => (
        <WrapFormItem
          customProps={item.props}
          rules={item.rules}
          {...props}
          type={key}
          {...context}
          updateActive={context.updateActive}
        />
      )}
    </LoginContext.Consumer>
  );
});

export default LoginItem as LoginItemType;
