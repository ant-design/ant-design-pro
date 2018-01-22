import React, { Component } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import styles from './index.less';

@connect(({ user }) => ({
  isLoading: user.isLoading,
}))
export default class LoadingPage extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.props.dispatch({
      type: 'user/fetchCurrent',
    });
  }
  render() {
    if (!this.props.isLoading) {
      return this.props.render();
    }
    return <Spin size="large" className={styles.globalSpin} />;
  }
}
