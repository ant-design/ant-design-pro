import 'rc-drawer-menu/assets/index.css';
import React, { PureComponent } from 'react';
import DrawerMenu from 'rc-drawer-menu';
import SiderMenu from './SiderMenu';

export default class Index extends PureComponent {
  onCollapse = (collapsed) => {
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  }

  render() {
    const { collapsed, isMobile } = this.props;
    return isMobile ? (
      <DrawerMenu
        parent={null}
        level={null}
        iconChild={null}
        open={!collapsed}
        onMaskClick={() => { this.onCollapse(true); }}
        width="256px"
      >
        <SiderMenu
          {...this.props}
          isMobile={isMobile}
          onCollapse={this.onCollapse}
          collapsed={isMobile ? false : collapsed}
        />
      </DrawerMenu>
    ) : (
      <SiderMenu
        {...this.props}
        isMobile={isMobile}
        onCollapse={this.onCollapse}
      />
    );
  }
}
