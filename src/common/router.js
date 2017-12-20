import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

export const getRouterData = (app) => {
  return {
    '/': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
      name: '首页',
    },
    '/dashboard/analysis': {
      component: dynamicWrapper(app, ['chart'], () => import('../routes/Dashboard/Analysis')),
      name: '分析页',
      // hideInMenu: true,                    如果不需要在 menu 中展示
      // hideInBreadcrumb: true,              如果不需要在 PageHeader Breadcrumb 中展示
    },
    '/dashboard/monitor': {
      component: dynamicWrapper(app, ['monitor'], () => import('../routes/Dashboard/Monitor')),
      name: '监控页',
    },
    '/dashboard/workplace': {
      component: dynamicWrapper(app, ['project', 'activities', 'chart'], () => import('../routes/Dashboard/Workplace')),
      name: '工作台',
    },
    '/form/basic-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/BasicForm')),
      name: '基础表单',
    },
    '/form/step-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm')),
      name: '分步表单',
    },
    '/form/advanced-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/AdvancedForm')),
      name: '高级表单',
    },
    '/list/table-list': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/List/TableList')),
      name: '查询表格',
    },
    '/list/basic-list': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/BasicList')),
      name: '标准列表',
    },
    '/list/card-list': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/CardList')),
      name: '卡片列表',
    },
    '/list/search': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/List')),
      name: '搜索列表',
    },
    '/list/search/projects': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Projects')),
      name: '搜索列表（项目）',
    },
    '/list/search/applications': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Applications')),
      name: '搜索列表（应用）',
    },
    '/list/search/articles': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Articles')),
      name: '搜索列表（文章）',
    },
    '/profile/basic': {
      component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/BasicProfile')),
      name: '基础详情页',
    },
    '/profile/advanced': {
      component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/AdvancedProfile')),
      name: '高级详情页',
    },
    '/result/success': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
      name: '成功',
    },
    '/result/fail': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Error')),
      name: '失败',
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
      name: '403',
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
      name: '404',
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
      name: '500',
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
      name: '账户',
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
      name: '登录',
    },
    '/user/register': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
      name: '注册',
    },
    '/user/register-result': {
      component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
      name: '注册结果',
    },
    // '/user/:id': {
    //   component: dynamicWrapper(app, [], () => import('../routes/User/SomeComponent')),
    //   name: '带参数路由',
    // },
  };
};
