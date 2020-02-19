import React, { Component } from 'react';

import { TabPaneProps } from 'antd/es/tabs';
import { Tabs } from 'antd';
import LoginContext, { LoginContextProps } from './LoginContext';

const { TabPane } = Tabs;

const generateId = (() => {
  let i = 0;
  return (prefix = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

interface LoginTabProps extends TabPaneProps {
  tabUtil: LoginContextProps['tabUtil'];
}

class LoginTab extends Component<LoginTabProps> {
  uniqueId: string = '';

  constructor(props: LoginTabProps) {
    super(props);
    this.uniqueId = generateId('login-tab-');
  }

  componentDidMount() {
    const { tabUtil } = this.props;
    if (tabUtil) {
      tabUtil.addTab(this.uniqueId);
    }
  }

  render() {
    const { children } = this.props;
    return <TabPane {...this.props}>{children}</TabPane>;
  }
}

const WrapContext: React.FC<TabPaneProps> & {
  typeName: string;
} = props => (
  <LoginContext.Consumer>
    {value => <LoginTab tabUtil={value.tabUtil} {...props} />}
  </LoginContext.Consumer>
);

// 标志位 用来判断是不是自定义组件
WrapContext.typeName = 'LoginTab';

export default WrapContext;
