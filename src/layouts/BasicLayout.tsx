import SiderMenu, { MenuDataItem, SiderMenuProps } from '@/components/SiderMenu';
import { ConnectProps, ConnectState, SettingModelState } from '@/models/connect';
import getPageTitle from '@/utils/getPageTitle';
import { Layout } from 'antd';
import classNames from 'classnames';
import { connect } from 'dva';
import React, { Suspense, useState } from 'react';
import { ContainerQuery } from 'react-container-query';
import DocumentTitle from 'react-document-title';
import useMedia from 'react-media-hook2';
import logo from '../assets/logo.svg';
import styles from './BasicLayout.less';
import Footer from './Footer';
import Header, { HeaderViewProps } from './Header';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

// lazy load SettingDrawer
const SettingDrawer = React.lazy(() => import('@/components/SettingDrawer'));

const { Content } = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

export interface BasicLayoutProps
  extends ConnectProps,
    SiderMenuProps,
    HeaderViewProps,
    Partial<SettingModelState> {
  breadcrumbNameMap: { [path: string]: MenuDataItem };
}

export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: { [path: string]: MenuDataItem };
};

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const {
    breadcrumbNameMap,
    dispatch,
    children,
    collapsed,
    fixedHeader,
    fixSiderbar,
    layout: PropsLayout,
    location,
    menuData,
    navTheme,
    route,
  } = props;
  const { routes, authority } = route!;
  /**
   * constructor
   */
  useState(() => {
    dispatch!({ type: 'user/fetchCurrent' });
    dispatch!({ type: 'setting/getSetting' });
    dispatch!({ type: 'menu/getMenuData', payload: { routes, authority } });
  });
  /**
   * init variables
   */
  const isMobile = useMedia({ id: 'BasicLayout', query: '(max-width: 599px)' })[0];
  const hasLeftPadding = fixSiderbar && PropsLayout !== 'topmenu' && !isMobile;
  const handleMenuCollapse = (payload: boolean) =>
    dispatch!({ type: 'global/changeLayoutCollapsed', payload });
  // Do not render SettingDrawer in production
  // unless it is deployed in preview.pro.ant.design as demo
  const renderSettingDrawer = () =>
    !(process.env.NODE_ENV === 'production' && APP_TYPE !== 'site') && <SettingDrawer />;
  const layout = (
    <Layout>
      {PropsLayout === 'topmenu' && !isMobile ? null : (
        <SiderMenu
          logo={logo}
          theme={navTheme}
          onCollapse={handleMenuCollapse}
          menuData={menuData}
          isMobile={isMobile}
          {...props}
        />
      )}
      <Layout
        style={{
          paddingLeft: hasLeftPadding ? (collapsed ? 80 : 256) : void 0,
          minHeight: '100vh',
        }}
      >
        <Header
          menuData={menuData}
          handleMenuCollapse={handleMenuCollapse}
          logo={logo}
          isMobile={isMobile}
          {...props}
        />
        <Content className={styles.content} style={!fixedHeader ? { paddingTop: 0 } : {}}>
          <PageHeaderWrapper location={location} breadcrumbNameMap={breadcrumbNameMap}>
            {children}
          </PageHeaderWrapper>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
  return (
    <React.Fragment>
      <DocumentTitle title={getPageTitle(location!.pathname, breadcrumbNameMap)}>
        <ContainerQuery query={query}>
          {params => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
      <Suspense fallback={null}>{renderSettingDrawer()}</Suspense>
    </React.Fragment>
  );
};

export default connect(({ global, setting, menu: menuModel }: ConnectState) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
  ...setting,
}))(BasicLayout);
