import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './index.less';

interface FooterToolbarProps {
  extra?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

interface FooterToolbarState {
  width?: string | number;
}
export default class FooterToolbar extends Component<FooterToolbarProps, FooterToolbarState> {
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
    const sider: any = document.querySelector('.ant-layout-sider');
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
    const { children, className, extra, ...restProps } = this.props;
    const { width } = this.state;
    return (
      <div className={classNames(className, styles.toolbar)} style={{ width }} {...restProps}>
        <div className={styles.left}>{extra}</div>
        <div className={styles.right}>{children}</div>
      </div>
    );
  }
}
