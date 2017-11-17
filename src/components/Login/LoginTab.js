import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const generateId = (() => {
  let i = 0;
  return (prefix: string = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

export default class LoginTab extends Component {
  static contextTypes = {
    tabUtil: PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.uniqueId = generateId('login-tab-');
  }
  componentWillMount() {
    if (this.context.tabUtil) {
      this.context.tabUtil.addTab(this.uniqueId);
    }
  }
  render() {
    const { tab, children, ...restProps } = this.props;
    return (
      <TabPane tab={tab} {...restProps}>{ children }</TabPane>
    );
  }
}
