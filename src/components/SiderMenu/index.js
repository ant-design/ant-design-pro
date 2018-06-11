import 'rc-drawer/assets/index.css';
import React from 'react';
import DrawerMenu from 'rc-drawer';
import SiderMenu from './SiderMenu';

const SiderMenuWrapper = props =>
  props.isMobile ? (
    <DrawerMenu
      getContainer={null}
      level={null}
      handleChild={<i className="drawer-handle-icon" />}
      onHandleClick={() => {
        props.onCollapse(!props.collapsed);
      }}
      open={!props.collapsed}
      onMaskClick={() => {
        props.onCollapse(true);
      }}
    >
      <SiderMenu {...props} collapsed={props.isMobile ? false : props.collapsed} />
    </DrawerMenu>
  ) : (
    <SiderMenu {...props} />
  );

export default SiderMenuWrapper;
