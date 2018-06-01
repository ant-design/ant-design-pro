import React, { Component } from 'react';
import { Tabs } from 'antd';
import LoginContext from './loginContext';

const { TabPane } = Tabs;

const generateId = (() => {
  let i = 0;
  return (prefix = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

class LoginTab extends Component {
  constructor(props) {
    super(props);
    this.uniqueId = generateId('login-tab-');
  }
  componentDidMount() {
    this.props.tabUtil.addTab(this.uniqueId);
  }
  render() {
    return <TabPane {...this.props}>{this.props.children}</TabPane>;
  }
}

const warpContext = props => {
  return (
    <LoginContext.Consumer>
      {value => {
        return <LoginTab tabUtil={value.tabUtil} {...props} />;
      }}
    </LoginContext.Consumer>
  );
};
// 标志位 用来判断是不是自定义组件
warpContext.typeName = 'LoginTab';

export default warpContext;
