import React, { Component } from 'react';
import { connect } from 'dva';
import { FormattedMessage, formatMessage } from 'umi/locale';
import Link from 'umi/link';
import router from 'umi/router';
import { Form, Input, Button, Select, Row, Col, Popover, Progress } from 'antd';
import styles from './Register.less';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      {formatMessage({ id: 'user.register.password.status.ok', defaultMessage: 'Status: Ok' }, {})}
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      {formatMessage(
        { id: 'user.register.password.status.pass', defaultMessage: 'Status: Pass' },
        {}
      )}
    </div>
  ),
  poor: (
    <div className={styles.error}>
      {formatMessage(
        { id: 'user.register.password.status.poor', defaultMessage: 'Status: Poor' },
        {}
      )}
    </div>
  ),
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

@connect(({ register, loading }) => ({
  register,
  submitting: loading.effects['register/submit'],
}))
@Form.create()
class Register extends Component {
  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: '',
    prefix: '86',
  };

  componentDidUpdate() {
    const { form, register } = this.props;
    const account = form.getFieldValue('mail');
    if (register.status === 'ok') {
      router.push({
        pathname: '/user/register-result',
        state: {
          account,
        },
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
  };

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { prefix } = this.state;
        dispatch({
          type: 'register/submit',
          payload: {
            ...values,
            prefix,
          },
        });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    const { confirmDirty } = this.state;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback(
        formatMessage(
          {
            id: 'user.register.confirm-password.error.message',
            defaultMessage: 'Two passwords do not match!',
          },
          {}
        )
      );
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    const { visible, confirmDirty } = this.state;
    if (!value) {
      this.setState({
        help: formatMessage(
          {
            id: 'user.register.password.required.message',
            defaultMessage: 'Please enter password!',
          },
          {}
        ),
        visible: !!value,
      });
      callback('error');
    } else {
      this.setState({
        help: '',
      });
      if (!visible) {
        this.setState({
          visible: !!value,
        });
      }
      if (value.length < 6) {
        callback('error');
      } else {
        const { form } = this.props;
        if (value && confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    }
  };

  changePrefix = value => {
    this.setState({
      prefix: value,
    });
  };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { count, prefix, help, visible } = this.state;
    return (
      <div className={styles.main}>
        <h3>
          <FormattedMessage id="user.register.title" defaultMessage="Register" />
        </h3>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('mail', {
              rules: [
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'user.register.mail.required.message',
                      defaultMessage: 'Please enter email!',
                    },
                    {}
                  ),
                },
                {
                  type: 'email',
                  message: formatMessage(
                    {
                      id: 'user.register.mail.format.message',
                      defaultMessage: 'Wrong email format!',
                    },
                    {}
                  ),
                },
              ],
            })(
              <Input
                size="large"
                placeholder={formatMessage(
                  { id: 'user.register.mail.title', defaultMessage: 'Email' },
                  {}
                )}
              />
            )}
          </FormItem>
          <FormItem help={help}>
            <Popover
              content={
                <div style={{ padding: '4px 0' }}>
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div style={{ marginTop: 10 }}>
                    <FormattedMessage
                      id="user.register.password.status.desc"
                      defaultMessage="Please enter at least 6 characters. Please do not use easily guessed passwords."
                    />
                  </div>
                </div>
              }
              overlayStyle={{ width: 240 }}
              placement="right"
              visible={visible}
            >
              {getFieldDecorator('password', {
                rules: [
                  {
                    validator: this.checkPassword,
                  },
                ],
              })(
                <Input
                  size="large"
                  type="password"
                  placeholder={formatMessage(
                    { id: 'user.register.password.title', defaultMessage: 'Password' },
                    {}
                  )}
                />
              )}
            </Popover>
          </FormItem>
          <FormItem>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'user.register.confirm-password.required.message',
                      defaultMessage: 'Please enter confirm password!',
                    },
                    {}
                  ),
                },
                {
                  validator: this.checkConfirm,
                },
              ],
            })(
              <Input
                size="large"
                type="password"
                placeholder={formatMessage(
                  {
                    id: 'user.register.confirm-password.title',
                    defaultMessage: 'Confirm Password',
                  },
                  {}
                )}
              />
            )}
          </FormItem>
          <FormItem>
            <InputGroup compact>
              <Select
                size="large"
                value={prefix}
                onChange={this.changePrefix}
                style={{ width: '20%' }}
              >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
              </Select>
              {getFieldDecorator('mobile', {
                rules: [
                  {
                    required: true,
                    message: formatMessage(
                      {
                        id: 'user.register.mobile.required.message',
                        defaultMessage: 'Please enter mobile!',
                      },
                      {}
                    ),
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: formatMessage(
                      {
                        id: 'user.register.mobile.format.message',
                        defaultMessage: 'Wrong mobile number format!!',
                      },
                      {}
                    ),
                  },
                ],
              })(
                <Input
                  size="large"
                  style={{ width: '80%' }}
                  placeholder={formatMessage(
                    { id: 'user.register.mobile.title', defaultMessage: 'Mobile' },
                    {}
                  )}
                />
              )}
            </InputGroup>
          </FormItem>
          <FormItem>
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator('captcha', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage(
                        {
                          id: 'user.register.captcha.required.message',
                          defaultMessage: 'Please enter captcha!',
                        },
                        {}
                      ),
                    },
                  ],
                })(
                  <Input
                    size="large"
                    placeholder={formatMessage(
                      { id: 'user.register.captcha.title', defaultMessage: 'Captcha' },
                      {}
                    )}
                  />
                )}
              </Col>
              <Col span={8}>
                <Button
                  size="large"
                  disabled={count}
                  className={styles.getCaptcha}
                  onClick={this.onGetCaptcha}
                >
                  {count
                    ? `${count} s`
                    : formatMessage(
                        {
                          id: 'user.register.captcha.get-captcha-button-text',
                          defaultMessage: 'Get Captcha',
                        },
                        {}
                      )}
                </Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              <FormattedMessage id="user.register.submit" defaultMessage="Register" />
            </Button>
            <Link className={styles.login} to="/User/Login">
              <FormattedMessage id="user.register.to-login" defaultMessage="To Login" />
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Register;
