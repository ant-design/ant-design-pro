import React from 'react';
import dynamic from 'dva/dynamic';
import { getMenuData } from './menu';

/**
 * 因为webpack不支持完全动态所以权宜之计
 * webpack配置webpackMode:eager来将所有文件打包为一个文件
 * 但是加载仍然使用 Promise
 * 如果需要继续使用代码分割
 * 改为 webpackMode: "lazy"
 * 参考 https://webpack.js.org/api/module-methods/#import-
 * @param {file path} path
 */
const routesImport = path => import(
  /* webpackMode: "eager" */
  `../routes${path}`
);

const layoutsImport = path => import(
  /* webpackMode: "eager" */
  `../layouts${path}`
);

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  // eslint-disable-next-line no-underscore-dangle
  models: () => models.filter(m => !app._models.some(({ namespace }) => namespace === m))
    .map(m => import(
      /* webpackMode: "eager" */
      `../models/${m}.js`
    )),
  // add routerData prop
  component: () => {
    const routerData = getRouterData(app);
    return component().then((raw) => {
      const Component = raw.default || raw;
      return props => <Component {...props} routerData={routerData} />;
    });
  },
});

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach((item) => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = (app) => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['user', 'login'], layoutsImport('/BasicLayout')),
    },
    '/dashboard/analysis': {
      component: dynamicWrapper(app, ['chart'], routesImport('/Dashboard/Analysis')),
    },
    '/dashboard/monitor': {
      component: dynamicWrapper(app, ['monitor'], routesImport('/Dashboard/Monitor')),
    },
    '/dashboard/workplace': {
      component: dynamicWrapper(app, ['project', 'activities', 'chart'], routesImport('/Dashboard/Workplace')),
      // hideInBreadcrumb: true,
      // name: '工作台',
      // role: ['admin'],
    },
    '/form/basic-form': {
      component: dynamicWrapper(app, ['form'], routesImport('/Forms/BasicForm')),
    },
    '/form/step-form': {
      component: dynamicWrapper(app, ['form'], routesImport('/Forms/StepForm')),
    },
    '/form/step-form/info': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step1')),
    },
    '/form/step-form/confirm': {
      component: dynamicWrapper(app, ['form'], routesImport('/Forms/StepForm/Step2')),
    },
    '/form/step-form/result': {
      component: dynamicWrapper(app, ['form'], routesImport('/Forms/StepForm/Step3')),
    },
    '/form/advanced-form': {
      component: dynamicWrapper(app, ['form'], routesImport('/Forms/AdvancedForm')),
    },
    '/list/table-list': {
      component: dynamicWrapper(app, ['rule'], routesImport('/List/TableList')),
    },
    '/list/basic-list': {
      component: dynamicWrapper(app, ['list'], routesImport('/List/BasicList')),
    },
    '/list/card-list': {
      component: dynamicWrapper(app, ['list'], routesImport('/List/CardList')),
    },
    '/list/search': {
      component: dynamicWrapper(app, ['list'], routesImport('/List/List')),
    },
    '/list/search/projects': {
      component: dynamicWrapper(app, ['list'], routesImport('/List/Projects')),
    },
    '/list/search/applications': {
      component: dynamicWrapper(app, ['list'], routesImport('/List/Applications')),
    },
    '/list/search/articles': {
      component: dynamicWrapper(app, ['list'], routesImport('/List/Articles')),
    },
    '/profile/basic': {
      component: dynamicWrapper(app, ['profile'], routesImport('/Profile/BasicProfile')),
    },
    '/profile/advanced': {
      component: dynamicWrapper(app, ['profile'], routesImport('/Profile/AdvancedProfile')),
    },
    '/result/success': {
      component: dynamicWrapper(app, [], routesImport('/Result/Success')),
    },
    '/result/fail': {
      component: dynamicWrapper(app, [], routesImport('/Result/Error')),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], routesImport('/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], routesImport('/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], routesImport('/Exception/500')),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'], routesImport('/Exception/triggerException')),
    },
    '/user': {
      component: dynamicWrapper(app, [], layoutsImport('/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], routesImport('/User/Login')),
    },
    '/user/register': {
      component: dynamicWrapper(app, ['register'], routesImport('/User/Register')),
    },
    '/user/register-result': {
      component: dynamicWrapper(app, [], routesImport('/User/RegisterResult')),
    },
    // '/user/:id': {
    //   component: dynamicWrapper(app, [],MyImport('/User/SomeComponent')),
    // },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());
  const routerData = {};
  Object.keys(routerConfig).forEach((item) => {
    const menuItem = menuData[item.replace(/^\//, '')] || {};
    routerData[item] = {
      ...routerConfig[item],
      name: routerConfig[item].name || menuItem.name,
      role: routerConfig[item].role || menuItem.role,
    };
  });
  return routerData;
};
