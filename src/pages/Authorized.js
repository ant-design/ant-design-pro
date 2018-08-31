import React from 'react';
import RenderAuthorized from '@/components/Authorized';
import Exception from '@/components/Exception';
import { matchRoutes } from 'react-router-config';
import uniq from 'lodash/uniq';

const Authorized = RenderAuthorized(['admin', 'user']);
const noMatch = <Exception type="403" style={{ minHeight: 500, height: '80%' }} />;

export default ({ children, route, location }) => {
  const routes = matchRoutes(route.routes, location.pathname);
  let authorities = [];
  routes.forEach(item => {
    if (Array.isArray(item.authority)) {
      authorities = authorities.concat(item.authority);
    } else if (typeof item.authority === 'string') {
      authorities.push(item.authority);
    }
  });
  return (
    <Authorized authority={uniq(authorities)} noMatch={noMatch}>
      {children}
    </Authorized>
  );
};
