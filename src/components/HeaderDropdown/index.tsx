import React, { FunctionComponent } from 'react';
import { Dropdown } from 'antd';
import { DropDownProps } from 'antd/es/dropdown';
import classNames from 'classnames';
import styles from './index.less';

export interface HeaderDropdownProps extends DropDownProps {
  overlayClassName?: string;
}

const HeaderDropdown: FunctionComponent<HeaderDropdownProps> = ({
  overlayClassName: cls,
  ...restProps
}) => <Dropdown overlayClassName={classNames(styles.container, cls)} {...restProps} />;

export default HeaderDropdown;
