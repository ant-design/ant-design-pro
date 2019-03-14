import fetch from 'dva/fetch';
import { IRoute } from 'umi-types';

export const dva = {
  config: {
    onError(err: ErrorEvent) {
      err.preventDefault();
    },
  },
};

let authRoutes = {};

function ergodicRoutes(routes: IRoute[], authKey: string, authority: string | string[]) {
  routes.forEach(element => {
    if (element.path === authKey) {
      if (!element.authority) element.authority = []; // eslint-disable-line
      Object.assign(element.authority, authority || []);
    } else if (element.routes) {
      ergodicRoutes(element.routes, authKey, authority);
    }
    return element;
  });
}

export function patchRoutes(routes: IRoute[]) {
  Object.keys(authRoutes).map(authKey =>
    ergodicRoutes(routes, authKey, authRoutes[authKey].authority),
  );
  (window as any).g_routes = routes;
}

export function render(oldRender: Function) {
  fetch('/api/auth_routes')
    .then(res => res.json())
    .then(
      ret => {
        authRoutes = ret;
        oldRender();
      },
      () => {
        oldRender();
      },
    );
}
