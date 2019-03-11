import React, { Component } from 'react';
import { Icon } from 'antd';
import Link from 'umi/link';
import debounce from 'lodash/debounce';
import styles from './index.less';
import RightContent from './RightContent';

interface GlobalHeaderProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  isMobile?: boolean;
  logo?: string;
  onNoticeClear?: (type: string) => void;
  onMenuClick?: ({ key: string }) => void;
  onNoticeVisibleChange?: (b: boolean) => void;
}

export default class GlobalHeader extends Component<GlobalHeaderProps> {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  triggerResizeEvent = debounce(() => {
    // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  });
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };
  render() {
    const { collapsed, isMobile, logo } = this.props;
    return (
      <div className={styles.header}>
        {isMobile && (
          <Link to="/" className={styles.logo} key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>
        )}
        <span className={styles.trigger} onClick={this.toggle}>
          <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
        </span>
        <RightContent {...this.props} />
      </div>
    );
  }
}
