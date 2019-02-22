import React from 'react';
import pathToRegexp from 'path-to-regexp';
import Authorized from '@/utils/Authorized';
import Exception403 from './Exception/403';

export default ({ children, location }) => {
  /* eslint-disable no-underscore-dangle */
  const { routerData } = window.g_app._store.getState().menu;
  const getRouteAuthority = (pathname, routeData) => {
    const routes = routeData.slice(); // clone

    const getAuthority = (routeDatas, path) => {
      let authorities;
      routeDatas.forEach(route => {
        // check partial route
        if (pathToRegexp(`${route.path}(.*)`).test(path)) {
          if (route.authority) {
            authorities = route.authority;
          }
          // is exact route?
          if (!pathToRegexp(route.path).test(path) && route.routes) {
            authorities = getAuthority(route.routes, path);
          }
        }
      });
      return authorities;
    };

    return getAuthority(routes, pathname);
  };

  return (
    <Authorized
      authority={getRouteAuthority(location.pathname, routerData)}
      noMatch={<Exception403 />}
    >
      {children}
    </Authorized>
  );
};
