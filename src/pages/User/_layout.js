import React from 'react';
import { getRouterData } from 'common/router';
import { getMenuData } from 'common/menu';
import UserLayout from '../layouts/UserLayout';

export default props => {
  const { children, location } = props;
  const routerData = getRouterData({});
  const menuData = getMenuData({});
  return (
    <UserLayout routerData={routerData} menuData={menuData} location={location} {...props}>
      {children}
    </UserLayout>
  );
};
