import React from 'react';
import RenderAuthorized from '@/components/Authorized';
import Exception from '@/components/Exception';
import { matchRoutes } from 'react-router-config';

const Authorized = RenderAuthorized('user');
const noMatch = <Exception type="403" style={{ minHeight: 500, height: '80%' }} />;

export default ({ children, route, location }) => {
  const branch =
    matchRoutes(route.routes, location.pathname).filter(item => item.match.isExact)[0] || {};
  const { authority } = branch.route || {};
  return (
    <Authorized authority={authority} noMatch={noMatch}>
      {children}
    </Authorized>
  );
};
