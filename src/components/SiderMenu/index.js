import 'rc-drawer-menu/assets/index.css';
import React from 'react';
import DrawerMenu from 'rc-drawer-menu';
import SiderMenu from './SiderMenu';
/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menus
 */
const getFlatMenuKeys = menus => {
  let keys = [];
  menus.forEach(item => {
    if (item.children) {
      keys = keys.concat(getFlatMenuKeys(item.children));
    }
    keys.push(item.path);
  });
  return keys;
};

export default props => {
  return props.isMobile ? (
    <DrawerMenu
      parent={null}
      level={null}
      iconChild={null}
      open={!props.collapsed}
      onMaskClick={() => {
        props.onCollapse(true);
      }}
      width="256px"
    >
      <SiderMenu
        {...props}
        flatMenuKeys={getFlatMenuKeys(props.menuData)}
        collapsed={props.isMobile ? false : props.collapsed}
      />
    </DrawerMenu>
  ) : (
    <SiderMenu {...props} flatMenuKeys={getFlatMenuKeys(props.menuData)} />
  );
};
