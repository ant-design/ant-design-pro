import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dva/router';
import { Form, Tabs, Button, Row, Col, Alert } from 'antd';
import classNames from 'classnames';
import styles from './index.less';
import map from './map';

const FormItem = Form.Item;
const { TabPane } = Tabs;

@Form.create()
export default class Login extends Component {
  static defaultProps = {
    className: '',
    data: [],
    extra: null,
    moreLoginTypes: null,
    register: null,
    onTabChange: () => {},
    onSubmit: () => {},
    onGetCaptcha: () => {},
  };
  static propTypes = {
    className: PropTypes.string,
    data: PropTypes.array,
    extra: PropTypes.node,
    moreLoginTypes: PropTypes.object,
    register: PropTypes.object,
    onTabChange: PropTypes.func,
    onSubmit: PropTypes.func,
    onGetCaptcha: PropTypes.func,
  };
  state = {
    count: 0,
    type: this.props.defaultActiveKey,
  };
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  onSwitch = (key) => {
    this.setState({
      type: key,
    });
    this.props.onTabChange(key);
  }
  onGetCaptcha = () => {
    let count = 59;
    this.setState({ count });
    this.props.onGetCaptcha();
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
    const activeKey = this.state.type;
    const { data } = this.props;
    const activeData = data.filter(item => item.key === activeKey);
    if (activeData[0]) {
      const activeFileds = activeData[0].inputControls.map(control => control.key);
      this.props.form.validateFields(activeFileds, { force: true },
        (err, values) => {
          this.props.onSubmit(err, values);
        }
      );
    }
  }
  renderNotice = (notice) => {
    if (notice.message) {
      return <Alert style={{ marginBottom: 24 }} {...notice} />;
    }
    return null;
  }
  renderControl = (control) => {
    const { getFieldDecorator } = this.props.form;
    const { count } = this.state;
    const options = {};
    const { type } = control;
    if (map[type]) {
      options.rules = control.rules ? control.rules : map[type].rules;
      let otherProps = {};
      if (control.props) {
        const { onChange, defaultValue, ...restProps } = control.props;
        if (onChange) {
          options.onChange = onChange;
        }
        if (defaultValue) {
          options.initialValue = defaultValue;
        }
        otherProps = restProps || otherProps;
      }
      const TypeComponent = map[type].component;
      if (type === 'captcha') {
        return (
          <FormItem key={control.key}>
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator(control.key, options)(
                  <TypeComponent {...map[type].props} {...otherProps} />
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
        <FormItem key={control.key}>
          {getFieldDecorator(control.key, options)(
            <TypeComponent {...map[type].props} {...otherProps} />
          )}
        </FormItem>
      );
    } else {
      return null;
    }
  }
  render() {
    const { className, data, notice, extra, moreLoginTypes, register } = this.props;
    const { type } = this.state;
    return (
      <div className={classNames(className, styles.main)}>
        <Form onSubmit={this.handleSubmit}>
          <Tabs animated={false} className={styles.tabs} activeKey={type} onChange={this.onSwitch}>
            {
              data.map(item => (
                <TabPane tab={item.loginType} key={item.key}>
                  {
                    notice && this.renderNotice(notice)
                  }
                  {
                    item.inputControls.map(control => this.renderControl(control))
                  }
                </TabPane>
              ))
            }
          </Tabs>
          { extra && <div className={styles.additional}>{extra}</div> }
          <FormItem>
            <Button size="large" className={styles.submit} type="primary" htmlType="submit">
              登录
            </Button>
          </FormItem>
        </Form>
        {
          (moreLoginTypes || register) &&
          <div className={styles.other}>
            {moreLoginTypes && (moreLoginTypes.title || '其他登录方式')}
            {moreLoginTypes && moreLoginTypes.types}
            {register &&
              (register.href ?
                <Link className={styles.register} to={register.href}>{register.title || '注册账户'}</Link> :
                <span className={styles.register}>{register.title || '注册账户'}</span>
              )}
          </div>
        }
      </div>
    );
  }
}
