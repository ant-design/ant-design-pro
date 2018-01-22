import React, { Component } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import styles from './index.less';
import userManger from './utils/userManger';

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
export default class LoadingPage extends Component {
    static propTypes = {
      render: PropTypes.func.isRequired,
    }
    componentDidMount() {
      this.props.dispatch({
        type: 'user/fetchCurrent',
        payload: userManger.getUserName(),
      });
    }
    render() {
      if (this.props.currentUser.userid) {
        return this.props.render();
      }
      return <Spin size="large" className={styles.globalSpin} />;
    }
}
