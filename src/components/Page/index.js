import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './index.less';

/**
 * 内页100%高度
 */
export default class Page extends Component {
  render() {
    const { className, children, inner = false } = this.props;

    return (
      <div
        className={classnames(className, {
          [styles.contentInner]: inner,
        })}
      >
        {children}
      </div>
    );
  }
}

Page.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  inner: PropTypes.bool,
};
