import fetch from 'dva/fetch';
import path from 'path';
import React from 'react';
import defaultSettings from './defaultSettings';

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
    },
  },
};

let authRoutes = null;
function checkJsPath(jsPath) {
  return /^\./.test(jsPath) ? jsPath : `./${jsPath}`;
}
function findJS(name) {
  const jsPath = /^src/.test(name) ? name.replace(/src/, '.') : name;
  const preUri = /^\./.test(name) ? './pages/' : '';
  return require(`${checkJsPath(path.join(preUri, jsPath))}`).default; // eslint-disable-line
}

function renderRoute(route) {
  if (route.component && route.path) route.component = findJS(route.component); // eslint-disable-line
  return route;
}
function renderRoutes(routes) {
  routes.forEach(element => {
    element = renderRoute(element); // eslint-disable-line
    if (element && element.routes) {
      element.routes = renderRoutes(element.routes); // eslint-disable-line
    } else {
      element.exact = element.exact || true; // eslint-disable-line
    }
    if (element.Routes) {
      element.Routes = element.Routes.map(item => findJS(item)); // eslint-disable-line
    }
  });

  // 开发模式添加404页面
  const noFindPage = require('./pages/404.js').default; // eslint-disable-line
  routes.push({
    component: () =>
      React.createElement(noFindPage, {
        pagesPath: 'src/pages',
        hasRoutesInConfig: true,
      }),
  });
  return routes;
}

export function patchRoutes(routes) {
  if (defaultSettings.runtimeMenu) {
    const routesRender = renderRoutes(authRoutes);
    routes.length = 0; // eslint-disable-line
    Object.assign(routes, routesRender);
  }
}

export function render(oldRender) {
  if (defaultSettings.runtimeMenu) {
    fetch('/api/auth_routes')
      .then(res => res.json())
      .then(ret => {
        authRoutes = ret;
        oldRender();
      });
  } else {
    oldRender();
  }
}
