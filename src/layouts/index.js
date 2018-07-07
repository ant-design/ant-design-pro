import React from 'react';
import { getRouterData } from 'common/router';
import { getMenuData } from 'common/menu';
import BasecLayout from './BasicLayout';
import BlankLayout from './BlankLayout';

// TODO routerData menuData etc...
const openPages = ['/User', '/User/Login', '/User/Register', '/User/RegisterResult'];
export default props => {
  const { children, location } = props;
  const routerData = getRouterData({});
  const menuData = getMenuData({});
  let { pathname } = location;
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (openPages && openPages.includes(pathname)) {
    return <BlankLayout>{children}</BlankLayout>;
  }
  return (
    <BasecLayout routerData={routerData} menuData={menuData} location={location}>
      {children}
    </BasecLayout>
  );
};
