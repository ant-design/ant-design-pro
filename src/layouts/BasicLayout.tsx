import PageLoading from '@/components/PageLoading';
import SiderMenu from '@/components/SiderMenu';
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
import Header from './Header';
import Context from './MenuContext';

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

export declare type SiderTheme = 'light' | 'dark';

interface BasicLayoutProps {
  dispatch: (args: any) => void;
  // wait for https://github.com/umijs/umi/pull/2036
  route: any;
  breadcrumbNameMap: object;
  fixSiderbar: boolean;
  layout: string;
  navTheme: SiderTheme;
  menuData: any[];
  fixedHeader: boolean;
  location: Location;
  collapsed: boolean;
}

interface BasicLayoutContext {
  location: Location;
  breadcrumbNameMap: object;
}

const BasicLayout: React.SFC<BasicLayoutProps> = props => {
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
    route: { routes, authority },
  } = props;
  useState(() => {
    dispatch({ type: 'user/fetchCurrent' });
    dispatch({ type: 'setting/getSetting' });
    dispatch({ type: 'menu/getMenuData', payload: { routes, authority } });
  });
  const isTop = PropsLayout === 'topmenu';
  const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};
  const isMobile = useMedia({ id: 'BasicLayout', query: '(max-width: 599px)' })[0];
  const hasLeftPadding = fixSiderbar && PropsLayout !== 'topmenu' && !isMobile;
  const getContext = (): BasicLayoutContext => ({ location, breadcrumbNameMap });
  const handleMenuCollapse = (payload: boolean) =>
    dispatch({ type: 'global/changeLayoutCollapsed', payload });
  // Do not render SettingDrawer in production
  // unless it is deployed in preview.pro.ant.design as demo
  const renderSettingDrawer = () =>
    !(process.env.NODE_ENV === 'production' && APP_TYPE !== 'site') && <SettingDrawer />;

  const layout = (
    <Layout>
      {isTop && !isMobile ? null : (
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
        <Content className={styles.content} style={contentStyle}>
          {children}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
  return (
    <React.Fragment>
      <DocumentTitle title={getPageTitle(location.pathname, breadcrumbNameMap)}>
        <ContainerQuery query={query}>
          {params => (
            <Context.Provider value={getContext()}>
              <div className={classNames(params)}>{layout}</div>
            </Context.Provider>
          )}
        </ContainerQuery>
      </DocumentTitle>
      <Suspense fallback={<PageLoading />}>{renderSettingDrawer()}</Suspense>
    </React.Fragment>
  );
};

export default connect(({ global, setting, menu: menuModel }) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
  ...setting,
}))(BasicLayout);
