import React from 'react';
import { Drawer } from 'antd';
import SiderMenu from './SiderMenu';

/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menus
 */
export const getFlatMenuKeys = menuData => {
  let keys = [];
  menuData.forEach(item => {
    keys.push(item.path);
    if (item.children) {
      keys = keys.concat(getFlatMenuKeys(item.children));
    }
  });
  return keys;
};

const SiderMenuWrapper = props => {
  const { isMobile, menuData, collapsed, onCollapse } = props;
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
      <SiderMenu
        {...props}
        flatMenuKeys={getFlatMenuKeys(menuData)}
        collapsed={isMobile ? false : collapsed}
      />
    </Drawer>
  ) : (
    <SiderMenu {...props} flatMenuKeys={getFlatMenuKeys(menuData)} />
  );
};

export default SiderMenuWrapper;
