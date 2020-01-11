import { Tabs, Form } from 'antd';
import React, { Component } from 'react';
import classNames from 'classnames';
import { FormInstance } from 'antd/es/form';
import LoginContext, { LoginContextProps } from './LoginContext';
import LoginItem, { LoginItemProps, LoginItemType } from './LoginItem';

import LoginSubmit from './LoginSubmit';
import LoginTab from './LoginTab';
import styles from './index.less';
import { LoginParamsType } from '@/services/login';

export interface LoginProps {
  defaultActiveKey?: string;
  onTabChange?: (key: string) => void;
  style?: React.CSSProperties;
  onSubmit?: (values: LoginParamsType) => void;
  className?: string;
  from?: FormInstance;
  children: React.ReactElement<typeof LoginTab>[];
}

interface LoginState {
  tabs?: string[];
  type?: string;
  active?: { [key: string]: unknown[] };
}

class Login extends Component<LoginProps, LoginState> {
  public static Tab = LoginTab;

  public static Submit = LoginSubmit;

  public static UserName: React.FunctionComponent<LoginItemProps>;

  public static Password: React.FunctionComponent<LoginItemProps>;

  public static Mobile: React.FunctionComponent<LoginItemProps>;

  public static Captcha: React.FunctionComponent<LoginItemProps>;

  static defaultProps = {
    className: '',
    defaultActiveKey: '',
    onTabChange: () => {},
    onSubmit: () => {},
  };

  constructor(props: LoginProps) {
    super(props);
    this.state = {
      type: props.defaultActiveKey,
      tabs: [],
      active: {},
    };
  }

  onSwitch = (type: string) => {
    this.setState(
      {
        type,
      },
      () => {
        const { onTabChange } = this.props;
        if (onTabChange) {
          onTabChange(type);
        }
      },
    );
  };

  getContext: () => LoginContextProps = () => {
    const { tabs = [] } = this.state;
    return {
      tabUtil: {
        addTab: id => {
          this.setState({
            tabs: [...tabs, id],
          });
        },
        removeTab: id => {
          this.setState({
            tabs: tabs.filter(currentId => currentId !== id),
          });
        },
      },
      updateActive: activeItem => {
        const { type = '', active = {} } = this.state;
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

  handleSubmit = (values: any) => {
    const { onSubmit } = this.props;
    if (onSubmit) {
      onSubmit(values);
    }
  };

  render() {
    const { className, from, children } = this.props;
    const { type, tabs = [] } = this.state;
    const TabChildren: React.ReactComponentElement<typeof LoginTab>[] = [];
    const otherChildren: React.ReactElement<unknown>[] = [];
    React.Children.forEach(
      children,
      (child: React.ReactComponentElement<typeof LoginTab> | React.ReactElement<unknown>) => {
        if (!child) {
          return;
        }
        if ((child.type as { typeName: string }).typeName === 'LoginTab') {
          TabChildren.push(child as React.ReactComponentElement<typeof LoginTab>);
        } else {
          otherChildren.push(child);
        }
      },
    );
    return (
      <LoginContext.Provider value={this.getContext()}>
        <div className={classNames(className, styles.login)}>
          <Form form={from} onFinish={this.handleSubmit}>
            {tabs.length ? (
              <React.Fragment>
                <Tabs
                  animated={false}
                  className={styles.tabs}
                  activeKey={type}
                  onChange={this.onSwitch}
                >
                  {TabChildren}
                </Tabs>
                {otherChildren}
              </React.Fragment>
            ) : (
              children
            )}
          </Form>
        </div>
      </LoginContext.Provider>
    );
  }
}

(Object.keys(LoginItem) as (keyof LoginItemType)[]).forEach(item => {
  Login[item] = LoginItem[item];
});

export default Login;
