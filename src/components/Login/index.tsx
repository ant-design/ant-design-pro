import { Form, Tabs } from 'antd';
import { WrappedFormUtils } from 'antd/es/form/Form';
import classNames from 'classnames';
import React, { Component } from 'react';
import styles from './index.less';
import LoginContext from './loginContext';
import LoginItem, { LoginItemProps } from './LoginItem';
import LoginSubmit from './LoginSubmit';
import LoginTab from './LoginTab';

interface LoginProps {
  defaultActiveKey?: string;
  onTabChange?: (key: string) => void;
  style?: React.CSSProperties;
  onSubmit?: (error: any, values: any) => void;
  form: WrappedFormUtils;
  className?: string;
}

interface LoginState {
  tabs: any[];
  type: string;
  active: object;
}

class Login extends Component<LoginProps, LoginState> {
  public static Tab: typeof LoginTab;
  public static UserName: React.FC<LoginItemProps>;
  public static Password: React.FC<LoginItemProps>;
  public static Mobile: React.FC<LoginItemProps>;
  public static Captcha: React.FC<LoginItemProps>;
  public static Submit: typeof LoginSubmit;

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

  onSwitch = type => {
    this.setState({
      type,
    });
    const { onTabChange } = this.props;
    onTabChange(type);
  };

  getContext = () => {
    const { tabs } = this.state;
    const { form } = this.props;
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
      form,
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
    const { form, onSubmit } = this.props;
    const activeFileds = active[type];
    form.validateFields(activeFileds, { force: true }, (err, values) => {
      onSubmit(err, values);
    });
  };

  render() {
    const { className, children } = this.props;
    const { type, tabs } = this.state;
    const TabChildren = [];
    const otherChildren = [];
    React.Children.forEach(children, (item: any) => {
      if (!item) {
        return;
      }
      // eslint-disable-next-line
      if (item.type.typeName === 'LoginTab') {
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

Login.Tab = LoginTab;
Login.Submit = LoginSubmit;
Object.keys(LoginItem).forEach(item => {
  Login[item] = LoginItem[item];
});

type WrappedLoginProps = { [P in Exclude<keyof LoginProps, 'form'>]?: LoginProps[P] };
interface WrappedLogin extends WrappedFormUtils {}
declare class WrappedLogin extends Component<WrappedLoginProps, LoginState> {
  public static Tab: typeof LoginTab;
  public static UserName: React.FC<LoginItemProps>;
  public static Password: React.FC<LoginItemProps>;
  public static Mobile: React.FC<LoginItemProps>;
  public static Captcha: React.FC<LoginItemProps>;
  public static Submit: typeof LoginSubmit;
}

export default Form.create()(Login) as typeof WrappedLogin;
