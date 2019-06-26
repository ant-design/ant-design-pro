import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.less';

export default class FooterToolbar extends Component {
  static contextTypes = {
    isMobile: PropTypes.bool,
  };

  state = {
    width: undefined,
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar);
    this.resizeFooterToolbar();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }

  resizeFooterToolbar = () => {
    const sider = document.querySelector('.ant-layout-sider');
    if (sider == null) {
      return;
    }
    const { isMobile } = this.context;
    const width = isMobile ? null : `calc(100% - ${sider.style.width})`;
    const { width: stateWidth } = this.state;
    if (stateWidth !== width) {
      this.setState({ width });
    }
  };

  render() {
    const { children, className, extra,extra2, ...restProps } = this.props;
    const { width } = this.state;
    return (
      <div className={classNames(className, styles.toolbar)} style={{ width }} {...restProps}>
        <div className={styles.right}>{extra}<span>&nbsp;&nbsp;&nbsp;</span></div>
        <div className={styles.center}>{children}</div>
        <div className={styles.right}><span>&nbsp;&nbsp;&nbsp;</span>{extra2}</div>
      </div>
    );
  }
}
