/* eslint-disable react/destructuring-assignment */

// https://umijs.org/config/

const path = require('path');
// const pageRoutes = require('../_routes');

export default {
  // add for transfer to umi
  plugins: [
    'umi-plugin-dva',
    'umi-plugin-locale',
    // TODO 决定是否使用约定路由，如果使用配置路由那么 umi-plugin-routes 可以去掉了
    // [
    //   'umi-plugin-routes',
    //   {
    //     exclude: [/\.test\.js/],
    //     update(routes) {
    //       return [...pageRoutes, ...routes];
    //     },
    //   },
    // ],
  ],
  disableServiceWorker: true,
  locale: {
    enable: true, // default false
    default: 'zh-CN', // default zh-CN
    baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
    antd: true, // use antd, default is true
  },
  // 路由配置
  routes: [
    // user
    {
      path: '/user',
      component: './layouts/UserLayout',
      routes: [
        { path: '/user', redirect: '/user/login' },
        { path: '/user/login', component: '/User/Login' },
        { path: '/user/register', component: './User/Register' },
        { path: '/user/register-result', component: './User/RegisterResult' },
      ],
    },
    // app
    {
      path: '/',
      component: './layouts/LoadingPage',
      routes: [
        // dashboard
        { path: '/', redirect: '/dashboard/analysis' },
        {
          path: '/dashboard',
          name: 'dashboard',
          icon: 'dashboard',
          routes: [
            { path: '/dashboard/analysis', name: 'analysis', component: './Dashboard/Analysis' },
            { path: '/dashboard/monitor', name: 'monitor', component: './Dashboard/Monitor' },
            { path: '/dashboard/workplace', name: 'workplace', component: './Dashboard/Workplace' },
          ],
        },
        // forms
        {
          path: '/form',
          icon: 'form',
          name: 'form',
          routes: [
            { path: '/form/basic-form', name: 'basicform', component: './Forms/BasicForm' },
            {
              name: 'stepform',
              path: '/form/step-form',
              component: './Forms/StepForm',
              hideChildren: true,
              routes: [
                { path: '/form/step-form/info', name: 'info', component: './Forms/StepForm/Step1' },
                {
                  path: '/form/step-form/confirm',
                  name: 'confirm',
                  component: './Forms/StepForm/Step2',
                },
                {
                  path: '/form/step-form/result',
                  name: 'result',
                  component: './Forms/StepForm/Step3',
                },
              ],
            },
            {
              path: '/form/advanced-form',
              name: 'advancedform',
              component: './Forms/AdvancedForm',
            },
          ],
        },
        // list
        {
          path: '/list',
          icon: 'table',
          name: 'list',
          routes: [
            { path: '/list/table-list', name: 'searchlist', component: './List/TableList' },
            { path: '/list/basic-list', name: 'basiclist', component: './List/BasicList' },
            { path: '/list/card-list', name: 'cardlist', component: './List/CardList' },
            {
              path: '/list/search',
              name: 'searchlist',
              component: './List/List',
              routes: [
                { path: '/list/search/articles', name: 'articles', component: './List/Articles' },
                { path: '/list/search/projects', name: 'projects', component: './List/Projects' },
                {
                  path: '/list/search/applications',
                  name: 'applications',
                  component: './List/Applications',
                },
              ],
            },
          ],
        },
        {
          path: '/profile',
          name: 'profile',
          icon: 'profile',
          routes: [
            // profile
            { path: '/profile/basic', name: 'basic', component: './Profile/BasicProfile' },
            { path: '/profile/advanced', name: 'advanced', component: './Profile/AdvancedProfile' },
          ],
        },
        {
          name: 'result',
          icon: 'check-circle-o',
          path: '/result',
          routes: [
            // result
            { path: '/result/success', name: 'success', component: './Result/Success' },
            { path: '/result/fail', name: 'fail', component: './Result/Error' },
          ],
        },
        {
          name: 'exception',
          icon: 'warning',
          path: '/exception',
          routes: [
            // exception
            { path: '/exception/403', name: 'not-permission', component: './Exception/403' },
            { path: '/exception/404', name: 'not-find', component: './Exception/404' },
            { path: '/exception/500', name: 'server-error', component: './Exception/500' },
            {
              path: '/exception/trigger',
              name: 'trigger',
              hideInMenu: true,
              component: './Exception/triggerException',
            },
          ],
        },
        {
          name: 'account',
          icon: 'user',
          path: '/account',
          routes: [
            {
              path: '/account/center',
              name: 'center',
              component: './Account/Center/Center',
              routes: [
                { path: '/account/center', redirect: '/account/center/articles' },
                { path: '/account/center/articles', component: './Account/Center/Articles' },
                {
                  path: '/account/center/applications',
                  component: './Account/Center/Applications',
                },
                { path: '/account/center/projects', component: './Account/Center/Projects' },
              ],
            },
            {
              path: '/account/settings',
              name: 'settings',
              component: './Account/Settings/Info',
              routes: [
                { path: '/account/settings', redirect: '/account/settings/base' },
                { path: '/account/settings/base', component: './Account/Settings/BaseView' },
                {
                  path: '/account/settings/security',
                  component: './Account/Settings/SecurityView',
                },
                { path: '/account/settings/binding', component: './Account/Settings/BindingView' },
                {
                  path: '/account/settings/notification',
                  component: './Account/Settings/NotificationView',
                },
              ],
            },
          ],
        },
      ],
    },
  ],

  theme: {
    'card-actions-background': '#f5f8fa',
  },

  // entry: 'src/index.js', // TODO remove
  extraBabelPlugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  externals: {
    '@antv/data-set': 'DataSet',
    bizcharts: 'BizCharts',
    rollbar: 'rollbar',
  },
  alias: {
    components: path.resolve(__dirname, '../src/components/'),
    utils: path.resolve(__dirname, '../src/utils/'),
    assets: path.resolve(__dirname, '../src/assets/'),
    common: path.resolve(__dirname, '../src/common/'),
  },
  ignoreMomentLocale: true,
  publicPath: '/',
  // TODO check hash config
  // hash: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less')
      ) {
        return localName;
      }
      const antdProPath = context.resourcePath.match(/src(.*)/)[1].replace('.less', '');
      const arr = antdProPath
        .split('/')
        .map(a => a.replace(/([A-Z])/g, '-$1'))
        .map(a => a.toLowerCase());
      return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
    },
  },
  disableFastClick: true,
};
