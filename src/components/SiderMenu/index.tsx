import React from 'react';
import { Drawer } from 'antd';
import { SiderMenuProps } from './SiderMenu';
import SiderMenu from './SiderMenu';
import { getFlatMenuKeys } from './SiderMenuUtils';

export { SiderMenuProps };
export { MenuDataItem } from './BaseMenu';

const SiderMenuWrapper: React.FC<SiderMenuProps> = props => {
  const { isMobile, menuData, collapsed, onCollapse } = props;
  const flatMenuKeys = getFlatMenuKeys(menuData);
  return isMobile ? (
    <Drawer
      visible={!collapsed}
      placement="left"
      onClose={() => onCollapse!(true)}
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

SiderMenuWrapper.defaultProps = {
  onCollapse: () => void 0,
};

export default React.memo(SiderMenuWrapper);
