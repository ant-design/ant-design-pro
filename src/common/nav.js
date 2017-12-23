import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

// nav data
export const getNavData = app => [
  {
    component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    layout: 'BasicLayout',
    name: 'Home', // for breadcrumb
    path: '/',
    children: [
      {
        name: 'Dashboard',
        icon: 'dashboard',
        path: 'dashboard',
        children: [
          {
            name: 'Analyis',
            path: 'analysis',
            component: dynamicWrapper(app, ['chart'], () => import('../routes/Dashboard/Analysis')),
          },
          {
            name: 'Monitor',
            path: 'monitor',
            component: dynamicWrapper(app, ['monitor'], () => import('../routes/Dashboard/Monitor')),
          },
          {
            name: 'Workplace',
            path: 'workplace',
            component: dynamicWrapper(app, ['project', 'activities', 'chart'], () => import('../routes/Dashboard/Workplace')),
          },
        ],
      },
      {
        name: 'Form',
        path: 'form',
        icon: 'form',
        children: [
          {
            name: 'Basic Form',
            path: 'basic-form',
            component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/BasicForm')),
          },
          {
            name: 'Step-Form',
            path: 'step-form',
            component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm')),
            children: [
              {
                path: 'confirm',
                component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step2')),
              },
              {
                path: 'result',
                component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step3')),
              },
            ],
          },
          {
            name: 'Advanced Form',
            path: 'advanced-form',
            component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/AdvancedForm')),
          },
        ],
      },
      {
        name: 'List Page',
        path: 'list',
        icon: 'table',
        children: [
          {
            name: 'Query Form',
            path: 'table-list',
            component: dynamicWrapper(app, ['rule'], () => import('../routes/List/TableList')),
          },
          {
            name: 'Standard List',
            path: 'basic-list',
            component: dynamicWrapper(app, ['list'], () => import('../routes/List/BasicList')),
          },
          {
            name: 'Card List',
            path: 'card-list',
            component: dynamicWrapper(app, ['list'], () => import('../routes/List/CardList')),
          },
          {
            name: 'Search List',
            path: 'search',
            component: dynamicWrapper(app, [], () => import('../routes/List/List')),
            children: [{
              name: 'Search List (projects)',
              path: 'projects',
              component: dynamicWrapper(app, ['list'], () => import('../routes/List/Projects')),
            }, {
              name: 'Search List (applications)',
              path: 'applications',
              component: dynamicWrapper(app, ['list'], () => import('../routes/List/Applications')),
            }, {
              name: 'Search List (articles)',
              path: 'articles',
              component: dynamicWrapper(app, ['list'], () => import('../routes/List/Articles')),
            }],
          },
        ],
      },
      {
        name: 'Details Page',
        path: 'profile',
        icon: 'profile',
        children: [
          {
            name: 'Basic Details Page',
            path: 'basic',
            component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/BasicProfile')),
          },
          {
            name: 'Advanced Details Page',
            path: 'advanced',
            component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/AdvancedProfile')),
          },
        ],
      },
      {
        name: 'Result',
        path: 'result',
        icon: 'check-circle-o',
        children: [
          {
            name: 'Sucess',
            path: 'success',
            component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
          },
          {
            name: 'Fail',
            path: 'fail',
            component: dynamicWrapper(app, [], () => import('../routes/Result/Error')),
          },
        ],
      },
      {
        name: 'Exception',
        path: 'exception',
        icon: 'warning',
        children: [
          {
            name: '403',
            path: '403',
            component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
          },
          {
            name: '404',
            path: '404',
            component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
          },
          {
            name: '500',
            path: '500',
            component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
          },
        ],
      },
    ],
  },
  {
    component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    path: '/user',
    layout: 'UserLayout',
    children: [
      {
        name: 'Account',
        icon: 'user',
        path: 'user',
        children: [
          {
            name: 'Sign-in',
            path: 'login',
            component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
          },
          {
            name: 'Register',
            path: 'register',
            component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
          },
          {
            name: 'Registration Results',
            path: 'register-result',
            component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
          },
        ],
      },
    ],
  },
  {
    component: dynamicWrapper(app, [], () => import('../layouts/BlankLayout')),
    layout: 'BlankLayout',
    children: {
      name: 'Getting Started',
      path: 'http://pro.ant.design/docs/getting-started',
      target: '_blank',
      icon: 'book',
    },
  },
];
