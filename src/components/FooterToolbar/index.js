import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.less';

export default class FooterToolbar extends Component {
  static contextTypes = {
    layoutCollapsed: PropTypes.bool,
  };
  state = {
    width: '',
  };
  componentDidMount() {
    this.syncWidth();
  }
  componentWillReceiveProps() {
    this.syncWidth();
  }
  syncWidth() {
    const sider = document.querySelectorAll('.ant-layout-sider')[0];
    if (sider) {
      this.setState({
        width: `calc(100% - ${sider.style.width})`,
      });
    }
  }
  render() {
    const { children, style, className, extra, ...restProps } = this.props;
    return (
      <div
        className={classNames(className, styles.toolbar)}
        ref={this.getRefNode}
        style={{
          width: this.state.width,
          ...style,
        }}
        {...restProps}
      >
        <div className={styles.left}>{extra}</div>
        <div className={styles.right}>{children}</div>
      </div>
    );
  }
}
