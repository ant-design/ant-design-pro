import { Dropdown } from 'antd';
import classNames from 'classnames';
import React, { Component } from 'react';
import styles from './index.less';
import { DropDownProps } from 'antd/lib/dropdown';

export interface HeaderDropdownProps extends DropDownProps {
  overlayClassName?: string;
}

// Use class component to support `ref`
export default class HeaderDropdown extends Component<HeaderDropdownProps> {
  render() {
    const { overlayClassName, ...props } = this.props;
    return (
      <Dropdown overlayClassName={classNames(styles.container, overlayClassName)} {...props} />
    );
  }
}
