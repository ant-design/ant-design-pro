import React from 'react';
import { Drawer } from 'antd';
import SiderMenu from './SiderMenu';

const SiderMenuWrapper = props => {
  const { isMobile, collapsed } = props;
  return isMobile ? (
    <Drawer
      visible={!collapsed}
      placement="left"
      style={{
        padding: 0,
      }}
      onClose={() => {
        props.onCollapse(true);
      }}
    >
      <SiderMenu {...props} collapsed={isMobile ? false : collapsed} />
    </Drawer>
  ) : (
    <SiderMenu {...props} />
  );
};

export default SiderMenuWrapper;
