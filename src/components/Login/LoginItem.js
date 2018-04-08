import React, { Component } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import omit from 'omit.js';
import styles from './index.less';
import ItemMap from './map';
import LoginContext from './loginContext';

const FormItem = Form.Item;

class WarpFormItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  componentDidMount() {
    if (this.props.updateActive) {
      this.props.updateActive(this.props.name);
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  onGetCaptcha = () => {
    let count = 59;
    this.setState({ count });
    if (this.props.onGetCaptcha) {
      this.props.onGetCaptcha();
    }
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };
  getFormItemOptions = ({ onChange, defaultValue, rules }) => {
    const options = {
      rules: rules || this.customprops.rules,
    };
    if (onChange) {
      options.onChange = onChange;
    }
    if (defaultValue) {
      options.initialValue = defaultValue;
    }
    return options;
  };
  render() {
    const { count } = this.state;

    const { getFieldDecorator } = this.props.form;

    // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props
    const {
      onChange,
      customprops,
      defaultValue,
      rules,
      name,
      updateActive,
      ...restProps
    } = this.props;

    // get getFieldDecorator props
    const options = this.getFormItemOptions(this.props);

    const otherProps = restProps || {};
    if (this.props.type === 'Captcha') {
      const inputProps = omit(otherProps, ['onGetCaptcha']);
      return (
        <FormItem>
          <Row gutter={8}>
            <Col span={16}>
              {getFieldDecorator(name, options)(
                <Input {...this.props.customprops} {...inputProps} />
              )}
            </Col>
            <Col span={8}>
              <Button
                disabled={count}
                className={styles.getCaptcha}
                size="large"
                onClick={this.onGetCaptcha}
              >
                {count ? `${count} s` : '获取验证码'}
              </Button>
            </Col>
          </Row>
        </FormItem>
      );
    }
    return (
      <FormItem>
        {getFieldDecorator(name, options)(<Input {...this.props.customprops} {...otherProps} />)}
      </FormItem>
    );
  }
}

const LoginItem = {};
Object.keys(ItemMap).forEach(key => {
  const item = ItemMap[key];
  LoginItem[key] = props => {
    return (
      <LoginContext.Consumer>
        {context => (
          <WarpFormItem
            customprops={item.props}
            {...props}
            rules={item.rules}
            type={key}
            updateActive={context.updateActive}
            form={context.form}
          />
        )}
      </LoginContext.Consumer>
    );
  };
});

export default LoginItem;
