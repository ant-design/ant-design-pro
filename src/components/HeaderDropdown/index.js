import React from 'react';
import { Dropdown } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

const HeaderDropdown = ({ overlayClassName, ...props }) => (
  <Dropdown overlayClassName={classNames(styles.container, overlayClassName)} {...props} />
);

export default HeaderDropdown;
