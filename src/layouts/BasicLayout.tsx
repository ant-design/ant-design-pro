import { ConnectState, ConnectProps } from '@/models/connect';
import RightContent from '@/components/GlobalHeader/RightContent';
import { connect } from 'dva';
import React, { useState } from 'react';
import logo from '../assets/logo.svg';

import {
  BasicLayout as BasicLayoutComponents,
  BasicLayoutProps as BasicLayoutComponentsProps,
  MenuDataItem,
  Settings,
  SettingDrawer,
} from '@ant-design/pro-layout';
import Link from 'umi/link';

export interface BasicLayoutProps extends BasicLayoutComponentsProps, ConnectProps {
  breadcrumbNameMap: { [path: string]: MenuDataItem };
  settings: Settings;
}

export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: { [path: string]: MenuDataItem };
};

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { dispatch, children, route, settings } = props;
  const { routes, authority } = route!;
  /**
   * constructor
   */
  useState(() => {
    dispatch!({ type: 'user/fetchCurrent' });
    dispatch!({ type: 'settings/getSetting' });
    dispatch!({ type: 'menu/getMenuData', payload: { routes, authority } });
  });
  /**
   * init variables
   */
  const handleMenuCollapse = (payload: boolean) =>
    dispatch!({ type: 'global/changeLayoutCollapsed', payload });
  return (
    <>
      <BasicLayoutComponents
        logo={logo}
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) => {
          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        rightContentRender={rightProps => <RightContent {...rightProps} />}
        {...props}
        {...settings}
      >
        {children}
      </BasicLayoutComponents>
      <SettingDrawer
        settings={settings}
        onSettingChange={config =>
          dispatch!({
            type: 'settings/changeSetting',
            payload: config,
          })
        }
      />
    </>
  );
};

export default connect(({ global, settings, menu: menuModel }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
}))(BasicLayout);
