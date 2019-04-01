import { Tabs } from 'antd';
import React, { Component } from 'react';
import LoginContext from './loginContext';

const { TabPane } = Tabs;

const generateId = (() => {
  let i = 0;
  return (prefix = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

interface LoginTabProps {
  key?: string;
  tab?: React.ReactNode;
  tabUtil: {
    addTab: (id: any) => void;
    removeTab: (id: any) => void;
  };
}

class LoginTab extends Component<LoginTabProps> {
  uniqueId: string;

  constructor(props: LoginTabProps) {
    super(props);
    this.uniqueId = generateId('login-tab-');
  }
  componentDidMount() {
    const { tabUtil } = this.props;
    tabUtil.addTab(this.uniqueId);
  }

  render() {
    const { children } = this.props;
    return <TabPane {...this.props}>{children}</TabPane>;
  }
}

const wrapContext = (props: any) => (
  <LoginContext.Consumer>
    {(value: any) => <LoginTab tabUtil={value.tabUtil} {...props} />}
  </LoginContext.Consumer>
);

// 标志位 用来判断是不是自定义组件
wrapContext.typeName = 'LoginTab';

export default wrapContext;
