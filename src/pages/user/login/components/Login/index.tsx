import { Form, Tabs } from 'antd';
import React, { Component } from 'react';
import { FormComponentProps } from 'antd/es/form';
import classNames from 'classnames';
import LoginContext, { LoginContextProps } from './LoginContext';
import LoginItem, { LoginItemProps, LoginItemType } from './LoginItem';

import LoginSubmit from './LoginSubmit';
import LoginTab from './LoginTab';
import styles from './index.less';

export interface LoginProps {
  defaultActiveKey?: string;
  onTabChange?: (key: string) => void;
  style?: React.CSSProperties;
  onSubmit?: (error: any, values: any) => void;
  className?: string;
  form: FormComponentProps['form'];
  children: React.ReactElement<typeof LoginTab>[];
}

interface LoginState {
  tabs?: string[];
  type?: string;
  active?: { [key: string]: any[] };
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
    const { form } = this.props;
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
      form: { ...form },
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

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { active = {}, type = '' } = this.state;
    const { form, onSubmit } = this.props;
    const activeFields = active[type] || [];
    if (form) {
      form.validateFields(activeFields, { force: true }, (err, values) => {
        if (onSubmit) {
          onSubmit(err, values);
        }
      });
    }
  };

  render() {
    const { className, children } = this.props;
    const { type, tabs = [] } = this.state;
    const TabChildren: any[] = [];
    const otherChildren: any[] = [];
    React.Children.forEach(children, (child: any) => {
      if (!child) {
        return;
      }
      if (child.type.typeName === 'LoginTab') {
        TabChildren.push(child);
      } else {
        otherChildren.push(child);
      }
    });
    return (
      <LoginContext.Provider value={this.getContext()}>
        <div className={classNames(className, styles.login)}>
          <Form onSubmit={this.handleSubmit}>
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

export default Form.create<LoginProps>()(Login);
