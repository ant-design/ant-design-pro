import Authorized from '@/utils/Authorized';
import { connect } from 'dva';
import pathToRegexp from 'path-to-regexp';
import React from 'react';
import Redirect from 'umi/redirect';
import { IUserModelState } from '../models/user';

interface IAuthComponentProps {
  location: Location;
  routerData: any[];
  user: IUserModelState;
}

const AuthComponent: React.SFC<IAuthComponentProps> = ({
  children,
  location,
  routerData,
  user,
}) => {
  const { currentUser } = user;
  const isLogin = currentUser && currentUser.name;
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
      noMatch={isLogin ? <Redirect to="/exception/403" /> : <Redirect to="/user/login" />}
    >
      {children}
    </Authorized>
  );
};

export default connect(({ menu: menuModel, user }) => ({
  routerData: menuModel.routerData,
  user,
}))(AuthComponent);
