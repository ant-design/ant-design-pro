import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Input, Tabs, Button, Icon, Checkbox, Row, Col, Alert } from 'antd';
import styles from './Login.less';

const FormItem = Form.Item;
const { TabPane } = Tabs;

@connect(state => ({
  login: state.login,
}))
@Form.create()
export default class Login extends Component {
  state = {
    count: 0,
    type: 'account',
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onSwitch = (type) => {
    this.setState({ type });
  }

  onGetCaptcha = () => {
    let count = 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields({ force: true },
      (err, values) => {
        if (!err) {
          this.props.dispatch({
            type: 'login/login',
            payload: {
              ...values,
              type: this.state.type,
            },
          });
        }
      }
    );
  }

  renderMessage = (message) => {
    return (
      <Alert
        style={{ marginBottom: 24 }}
        message={message}
        type="error"
        showIcon
      />
    );
  }

  render() {
    const { form, login } = this.props;
    const { getFieldDecorator } = form;
    const { count, type } = this.state;
    return (
      <div className={styles.main}>
        <Form onSubmit={this.handleSubmit}>
          <Tabs animated={false} className={styles.tabs} activeKey={type} onChange={this.onSwitch}>
            <TabPane tab="Account Login" key="account">
              {
                login.status === 'error' &&
                login.type === 'account' &&
                login.submitting === false &&
                this.renderMessage('Account or Password error')
              }
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [{
                    required: type === 'account', message: 'Please enter the account name!',
                  }],
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="user" className={styles.prefixIcon} />}
                    placeholder="admin"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{
                    required: type === 'account', message: 'Please enter a password!',
                  }],
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="lock" className={styles.prefixIcon} />}
                    type="password"
                    placeholder="888888"
                  />
                )}
              </FormItem>
            </TabPane>
            <TabPane tab="Mobile Login" key="mobile">
              {
                login.status === 'error' &&
                login.type === 'mobile' &&
                login.submitting === false &&
                this.renderMessage('Verification Code error')
              }
              <FormItem>
                {getFieldDecorator('mobile', {
                  rules: [{
                    required: type === 'mobile', message: 'Please enter your cell phone number!',
                  }, {
                    pattern: /^1\d{10}$/, message: 'Cell phone number is wrong',
                  }],
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="mobile" className={styles.prefixIcon} />}
                    placeholder="Cell phone number"
                  />
                )}
              </FormItem>
              <FormItem>
                <Row gutter={8}>
                  <Col span={16}>
                    {getFieldDecorator('captcha', {
                      rules: [{
                        required: type === 'mobile', message: 'Please enter the verification code!',
                      }],
                    })(
                      <Input
                        size="large"
                        prefix={<Icon type="mail" className={styles.prefixIcon} />}
                        placeholder="Verification Code"
                      />
                    )}
                  </Col>
                  <Col span={8}>
                    <Button
                      disabled={count}
                      className={styles.getCaptcha}
                      size="large"
                      onClick={this.onGetCaptcha}
                    >
                      {count ? `${count} s` : 'Get code'}
                    </Button>
                  </Col>
                </Row>
              </FormItem>
            </TabPane>
          </Tabs>
          <FormItem className={styles.additional}>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox className={styles.autoLogin}>Remember me</Checkbox>
            )}
            <a className={styles.forgot} href="">Forgot your password?</a>
            <Button size="large" loading={login.submitting} className={styles.submit} type="primary" htmlType="submit">
              Sign-in
            </Button>
          </FormItem>
        </Form>
        <div className={styles.other}>
          Other login methods
          {/* Needs to be added to.. Icon 中 */}
          <span className={styles.iconAlipay} />
          <span className={styles.iconTaobao} />
          <span className={styles.iconWeibo} />
          <Link className={styles.register} to="/user/register">Register Account</Link>
        </div>
      </div>
    );
  }
}
