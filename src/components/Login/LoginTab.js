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
    return <TabPane {...this.props} />;
  }
}

const warpContext = props => {
  return (
    <LoginContext.Consumer>
      {value => <LoginTab tabUtil={value.tabUtil} {...props} />}
    </LoginContext.Consumer>
  );
};
export default warpContext;
