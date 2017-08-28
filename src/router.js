import React from 'react';
import { Router, Route, Redirect } from 'dva/router';
import navData from './common/nav';

function getRoutes(data, level = 0) {
  return data.map((item, i) => {
    let children;
    if (item.children) {
      children = getRoutes(item.children, level + 1);
    }
    let homePageRedirect;
    if (level === 1 && i === 0) {
      let indexPath;
      // First children router
      if (item.children && item.children[0]) {
        indexPath = `/${item.path}/${item.children[0].path}`;
      } else {
        indexPath = item.path;
      }
      homePageRedirect = <Redirect from="/" to={indexPath} />;
    }
    if (item.noRoute) {
      return null;
    }
    return (
      <Route
        key={item.key || item.path || ''}
        path={item.path}
        breadcrumbName={item.name}
        component={item.component}
      >
        {homePageRedirect}
        {children}
      </Route>
    );
  });
}

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      {getRoutes(navData)}
    </Router>
  );
}

export default RouterConfig;
