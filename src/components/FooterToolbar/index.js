import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './index.less';

export default class FooterToolbar extends Component {
  render() {
    const { children, className, extra, ...restProps } = this.props;
    return (
      <div className={classNames(className, styles.toolbar)} {...restProps}>
        <div className={styles.left}>{extra}</div>
        <div className={styles.right}>{children}</div>
      </div>
    );
  }
}
