import { Dropdown } from 'antd';
import classNames from 'classnames';
import React, { Component } from 'react';
import styles from './index.less';

declare type OverlayFunc = () => React.ReactNode;

export interface HeaderDropdownProps {
  overlayClassName?: string;
  overlay: React.ReactNode | OverlayFunc;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';
}

export default class HeaderDropdown extends Component<HeaderDropdownProps> {
  render() {
    const { overlayClassName, ...props } = this.props;

    return (
      <Dropdown overlayClassName={classNames(styles.container, overlayClassName)} {...props} />
    );
  }
}
