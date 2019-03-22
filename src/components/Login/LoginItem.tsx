import { Button, Col, Form, Input, Row } from 'antd';
import { WrappedFormUtils } from 'antd/es/form/Form';
import omit from 'omit.js';
import React, { Component } from 'react';
import styles from './index.less';
import LoginContext from './loginContext';
import ItemMap from './map';

const FormItem = Form.Item;

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
  onChange: (e: any) => void;
}

interface WrapFormItemState {
  count: number;
}

class WrapFormItem extends Component<LoginItemProps, WrapFormItemState> {
  static defaultProps = {
    getCaptchaButtonText: 'captcha',
    getCaptchaSecondText: 'second',
  };
  interval: NodeJS.Timeout;

  constructor(props: LoginItemProps) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    const { updateActive, name } = this.props;
    if (updateActive) {
      updateActive(name);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    const { onGetCaptcha } = this.props;
    const result: any = onGetCaptcha ? onGetCaptcha() : null;
    if (result === false) {
      return;
    }
    if (result instanceof Promise) {
      result.then(this.runGetCaptchaCountDown);
    } else {
      this.runGetCaptchaCountDown();
    }
  };

  getFormItemOptions = props => {
    const { onChange, defaultValue, customprops, rules } = props;
    const options: any = {
      rules: rules || customprops.rules,
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
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  render() {
    const { count } = this.state;

    const {
      form: { getFieldDecorator },
    } = this.props;

    // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props
    const {
      onChange,
      customprops,
      defaultValue,
      rules,
      name,
      getCaptchaButtonText,
      getCaptchaSecondText,
      updateActive,
      type,
      ...restProps
    } = this.props;

    // get getFieldDecorator props
    const options = this.getFormItemOptions(this.props);

    const otherProps = restProps || {};
    if (type === 'Captcha') {
      const inputProps = omit(otherProps, ['onGetCaptcha', 'countDown']);
      return (
        <FormItem>
          <Row gutter={8}>
            <Col span={16}>
              {getFieldDecorator(name, options)(<Input {...customprops} {...inputProps} />)}
            </Col>
            <Col span={8}>
              <Button
                disabled={!!count}
                className={styles.getCaptcha}
                size="large"
                onClick={this.onGetCaptcha}
              >
                {count ? `${count} ${getCaptchaSecondText}` : getCaptchaButtonText}
              </Button>
            </Col>
          </Row>
        </FormItem>
      );
    }
    return (
      <FormItem>
        {getFieldDecorator(name, options)(<Input {...customprops} {...otherProps} />)}
      </FormItem>
    );
  }
}

const LoginItem = {};
Object.keys(ItemMap).forEach(key => {
  const item = ItemMap[key];
  LoginItem[key] = props => (
    <LoginContext.Consumer>
      {context => (
        <WrapFormItem
          customprops={item.props}
          rules={item.rules}
          {...props}
          type={key}
          updateActive={context.updateActive}
          form={context.form}
        />
      )}
    </LoginContext.Consumer>
  );
});

export default LoginItem;
