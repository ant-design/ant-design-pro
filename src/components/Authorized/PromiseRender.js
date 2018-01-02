/*
 * 此Promise异步加载的组件
 * @Author: jim chen
 * @Date: 2018-01-02 11:17:36
 * @Last Modified by: jim chen
 * @Last Modified time: 2018-01-02 14:06:42
 */
import React from 'react';
import { Spin } from 'antd';

export default class PromiseRender extends React.PureComponent {
    state = {
      component: false,
    };
    async componentDidMount() {
      this.props.promise
        .then(() => {
          this.setState({
            component: this.props.ok,
          });
        })
        .catch(() => {
          this.setState({
            component: this.props.error,
          });
        });
    }
    render() {
      const C = this.state.component;
      return C ? (
        <C {...this.props} />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            margin: 'auto',
            paddingTop: 50,
            textAlign: 'center',
          }}
        >
          <Spin size="large" />
        </div>
      );
    }
}
