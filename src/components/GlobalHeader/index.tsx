import React, { Component } from 'react';
import { Icon } from 'antd';
import Link from 'umi/link';
import debounce from 'lodash/debounce';
import styles from './index.less';
import RightContent, { GlobalHeaderRightProps } from './RightContent';

type PartialGlobalHeaderRightProps = {
  [K in
    | 'onMenuClick'
    | 'onNoticeClear'
    | 'onNoticeVisibleChange'
    | 'currentUser']?: GlobalHeaderRightProps[K]
};

export interface GlobalHeaderProps extends PartialGlobalHeaderRightProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  isMobile?: boolean;
  logo?: string;
}

export default class GlobalHeader extends Component<GlobalHeaderProps> {
  triggerResizeEvent = debounce(() => {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  });
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    if (onCollapse) onCollapse(!collapsed);
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
