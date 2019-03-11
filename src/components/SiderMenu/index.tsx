import React from 'react';
import { Drawer } from 'antd';
import SiderMenu from './SiderMenu';
import { getFlatMenuKeys } from './SiderMenuUtils';

export declare type SiderTheme = 'light' | 'dark';

interface SiderMenuProps {
  isMobile: boolean;
  menuData: any[];
  collapsed: boolean;
  logo?: string;
  theme?: SiderTheme;
  onCollapse: (payload: boolean) => void;
}

const SiderMenuWrapper: React.SFC<SiderMenuProps> = props => {
  const { isMobile, menuData, collapsed, onCollapse } = props;
  const flatMenuKeys = getFlatMenuKeys(menuData);
  return isMobile ? (
    <Drawer
      visible={!collapsed}
      placement="left"
      onClose={() => onCollapse(true)}
      style={{
        padding: 0,
        height: '100vh',
      }}
    >
      <SiderMenu {...props} flatMenuKeys={flatMenuKeys} collapsed={isMobile ? false : collapsed} />
    </Drawer>
  ) : (
    <SiderMenu {...props} flatMenuKeys={flatMenuKeys} />
  );
};

export default React.memo(SiderMenuWrapper);
