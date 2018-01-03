/* eslint-disable global-require */
import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import { getMenuData } from './menu';

let routerDataCache;

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  models.forEach((model) => {
    if(!app['_models'].some(({ namespace }) => namespace === model)) { // eslint-disable-line
      app.model(require(`../models/${model}`)); // eslint-disable-line
    }
  });
  return (props) => {
    if (!routerDataCache) {
      routerDataCache = getRouterData(app);
    }
    return createElement(component, {
      ...props,
      routerData: routerDataCache,
    });
  };
};

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
      component: dynamicWrapper(app, ['user', 'login'], require('../layouts/BasicLayout')),
    },
    '/dashboard/analysis': {
      component: dynamicWrapper(app, ['chart'], require('../routes/Dashboard/Analysis')),
    },
    '/dashboard/monitor': {
      component: dynamicWrapper(app, ['monitor'], require('../routes/Dashboard/Monitor')),
    },
    '/dashboard/workplace': {
      component: dynamicWrapper(app, ['project', 'activities', 'chart'], require('../routes/Dashboard/Workplace')),
      // hideInBreadcrumb: true,
      // name: '工作台',
      // authority: 'admin',
    },
    '/form/basic-form': {
      component: dynamicWrapper(app, ['form'], require('../routes/Forms/BasicForm')),
    },
    '/form/step-form': {
      component: dynamicWrapper(app, ['form'], require('../routes/Forms/StepForm')),
    },
    '/form/step-form/info': {
      component: dynamicWrapper(app, ['form'], require('../routes/Forms/StepForm/Step1')),
    },
    '/form/step-form/confirm': {
      component: dynamicWrapper(app, ['form'], require('../routes/Forms/StepForm/Step2')),
    },
    '/form/step-form/result': {
      component: dynamicWrapper(app, ['form'], require('../routes/Forms/StepForm/Step3')),
    },
    '/form/advanced-form': {
      component: dynamicWrapper(app, ['form'], require('../routes/Forms/AdvancedForm')),
    },
    '/list/table-list': {
      component: dynamicWrapper(app, ['rule'], require('../routes/List/TableList')),
    },
    '/list/basic-list': {
      component: dynamicWrapper(app, ['list'], require('../routes/List/BasicList')),
    },
    '/list/card-list': {
      component: dynamicWrapper(app, ['list'], require('../routes/List/CardList')),
    },
    '/list/search': {
      component: dynamicWrapper(app, ['list'], require('../routes/List/List')),
    },
    '/list/search/projects': {
      component: dynamicWrapper(app, ['list'], require('../routes/List/Projects')),
    },
    '/list/search/applications': {
      component: dynamicWrapper(app, ['list'], require('../routes/List/Applications')),
    },
    '/list/search/articles': {
      component: dynamicWrapper(app, ['list'], require('../routes/List/Articles')),
    },
    '/profile/basic': {
      component: dynamicWrapper(app, ['profile'], require('../routes/Profile/BasicProfile')),
    },
    '/profile/advanced': {
      component: dynamicWrapper(app, ['profile'], require('../routes/Profile/AdvancedProfile')),
    },
    '/result/success': {
      component: dynamicWrapper(app, [], require('../routes/Result/Success')),
    },
    '/result/fail': {
      component: dynamicWrapper(app, [], require('../routes/Result/Error')),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], require('../routes/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], require('../routes/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], require('../routes/Exception/500')),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'], require('../routes/Exception/triggerException')),
    },
    '/user': {
      component: dynamicWrapper(app, [], require('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], require('../routes/User/Login')),
    },
    '/user/register': {
      component: dynamicWrapper(app, ['register'], require('../routes/User/Register')),
    },
    '/user/register-result': {
      component: dynamicWrapper(app, [], require('../routes/User/RegisterResult')),
    },
    // '/user/:id': {
    //   component: dynamicWrapper(app, [], require('../routes/User/SomeComponent')),
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
      authority: routerConfig[item].authority || menuItem.authority,
    };
  });
  return routerData;
};
