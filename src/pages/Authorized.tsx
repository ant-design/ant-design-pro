import Authorized from '@/utils/Authorized';
import { Route } from '@/models/connect';
import { ConnectProps, ConnectState, UserModelState } from '@/models/connect';
import { connect } from 'dva';
import pathToRegexp from 'path-to-regexp';
import React from 'react';
import Redirect from 'umi/redirect';

interface AuthComponentProps extends ConnectProps {
  routerData: Route[];
  user: UserModelState;
}

const getRouteAuthority = (path: string, routeData: Route[]) => {
  let authorities: string[] | string | undefined = void 0;
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

const AuthComponent: React.FC<AuthComponentProps> = ({ children, location, routerData, user }) => {
  const { currentUser } = user;
  const isLogin = currentUser && currentUser.name;
  return (
    <Authorized
      authority={getRouteAuthority(location!.pathname, routerData)!}
      noMatch={isLogin ? <Redirect to="/exception/403" /> : <Redirect to="/user/login" />}
    >
      {children}
    </Authorized>
  );
};

export default connect(({ menu: menuModel, user }: ConnectState) => ({
  routerData: menuModel.routerData,
  user,
}))(AuthComponent);
