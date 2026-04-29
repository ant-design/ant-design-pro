import { Dropdown } from 'antd';
import type { DropDownProps } from 'antd/es/dropdown';
import { createStyles } from 'antd-style';
import { clsx } from 'clsx';
import React from 'react';

const useStyles = createStyles(({ token }) => {
  return {
    dropdown: {
      [`@media screen and (max-width: ${token.screenXS}px)`]: {
        width: '100%',
      },
      '.ant-dropdown-menu-item .anticon, .ant-dropdown-menu-submenu-title .anticon':
        {
          display: 'inline-flex',
          alignItems: 'center',
        },
      '.ant-dropdown-menu-submenu-title .anticon': {
        color: token.colorTextSecondary,
      },
    },
  };
});

export type HeaderDropdownProps = {
  overlayClassName?: string;
  placement?:
    | 'bottomLeft'
    | 'bottomRight'
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomCenter';
} & Omit<DropDownProps, 'overlay'>;

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
  overlayClassName: cls,
  ...restProps
}) => {
  const { styles } = useStyles();
  return (
    <Dropdown
      classNames={{
        root: clsx(styles.dropdown, cls),
      }}
      {...restProps}
    />
  );
};

export default HeaderDropdown;
