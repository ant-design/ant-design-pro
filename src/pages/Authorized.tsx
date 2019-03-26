import Authorized from '@/utils/Authorized';
import pathToRegexp from 'path-to-regexp';
import React from 'react';
import Redirect from 'umi/redirect';
import { connect } from 'dva';
import { getAuthority } from '@/utils/authority';
import Exception403 from '@/pages/Exception/403';

interface AuthComponentProps {
  location: Location;
  routerData: any[];
  status: string;
}
const AuthComponent: React.FC<AuthComponentProps> = ({ children, location, routerData }) => {
  const auth = getAuthority();
  const isLogin = auth && auth[0] !== 'guest';
  const getRouteAuthority = (path, routeData) => {
    let authorities;
    routeData.forEach(route => {
      // match prefix
      if (pathToRegexp(`${route.path}(.*)`).test(path)) {
        authorities = route.authority || authorities;

        // get children authority recursively
        if (route.routes) {
          authorities = getRouteAuthority(path, route.routes) || authorities;
        }
      }
    });
    return authorities;
  };
  return (
    <Authorized
      authority={getRouteAuthority(location.pathname, routerData)}
      noMatch={isLogin ? <Exception403 /> : <Redirect to="/user/login" />}
    >
      {children}
    </Authorized>
  );
};

export default connect(({ menu: menuModel }) => ({
  routerData: menuModel.routerData,
}))(AuthComponent);
