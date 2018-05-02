import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Tabs } from 'antd';
import classNames from 'classnames';
import LoginItem from './LoginItem';
import LoginTab from './LoginTab';
import LoginSubmit from './LoginSubmit';
import styles from './index.less';
import LoginContext from './loginContext';

class Login extends Component {
  static defaultProps = {
    className: '',
    defaultActiveKey: '',
    onTabChange: () => {},
    onSubmit: () => {},
  };
  static propTypes = {
    className: PropTypes.string,
    defaultActiveKey: PropTypes.string,
    onTabChange: PropTypes.func,
    onSubmit: PropTypes.func,
  };
  state = {
    type: this.props.defaultActiveKey,
    tabs: [],
    active: {},
  };
  onSwitch = type => {
    this.setState({
      type,
    });
    this.props.onTabChange(type);
  };
  getContext = () => {
    return {
      tabUtil: {
        addTab: id => {
          this.setState({
            tabs: [...this.state.tabs, id],
          });
        },
        removeTab: id => {
          this.setState({
            tabs: this.state.tabs.filter(currentId => currentId !== id),
          });
        },
      },
      form: this.props.form,
      updateActive: activeItem => {
        const { type, active } = this.state;
        if (active[type]) {
          active[type].push(activeItem);
        } else {
          active[type] = [activeItem];
        }
        this.setState({
          active,
        });
      },
    };
  };
  handleSubmit = e => {
    e.preventDefault();
    const { active, type } = this.state;
    const activeFileds = active[type];
    this.props.form.validateFields(activeFileds, { force: true }, (err, values) => {
      this.props.onSubmit(err, values);
    });
  };
  render() {
    const { className, children } = this.props;
    const { type, tabs } = this.state;
    const TabChildren = [];
    const otherChildren = [];
    React.Children.forEach(children, item => {
      if (!item) {
        return;
      }
      // eslint-disable-next-line
      if (item.type.name === 'warpContext') {
        TabChildren.push(item);
      } else {
        otherChildren.push(item);
      }
    });
    return (
      <LoginContext.Provider value={this.getContext()}>
        <div className={classNames(className, styles.login)}>
          <Form onSubmit={this.handleSubmit}>
            {tabs.length ? (
              <>
                <Tabs
                  animated={false}
                  className={styles.tabs}
                  activeKey={type}
                  onChange={this.onSwitch}
                >
                  {TabChildren}
                </Tabs>
                {otherChildren}
              </>
            ) : (
              [...children]
            )}
          </Form>
        </div>
      </LoginContext.Provider>
    );
  }
}

Login.Tab = LoginTab;
Login.Submit = LoginSubmit;
Object.keys(LoginItem).forEach(item => {
  Login[item] = LoginItem[item];
});

export default Form.create()(Login);
