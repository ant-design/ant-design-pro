import React, { PureComponent } from 'react';
import { Button, Spin } from 'antd';
import { connect } from 'dva';
import styles from './style.less';

@connect(state => ({
  isloading: state.error.isloading,
}))
export default class TriggerException extends PureComponent {
  state={
    isloading: false,
  }
  trigger403 = () => {
    this.setState({
      isloading: true,
    });
    this.props.dispatch({
      type: 'error/query403',
    });
  };
  trigger500 = () => {
    this.setState({
      isloading: true,
    });
    this.props.dispatch({
      type: 'error/query500',
    });
  };
  trigger404 = () => {
    this.setState({
      isloading: true,
    });
    this.props.dispatch({
      type: 'error/query404',
    });
  };
  render() {
    return (
      <Spin spinning={this.state.isloading} wrapperClassName={styles.trigger}>
        <Button type="danger" onClick={this.trigger403}>
        触发403
        </Button>
        <Button type="danger" onClick={this.trigger500}>
         触发500
        </Button>
        <Button type="danger" onClick={this.trigger404}>
         触发404
        </Button>
      </Spin>
    );
  }
}
