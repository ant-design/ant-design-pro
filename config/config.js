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
        { path: '/dashboard/analysis', component: './Dashboard/Analysis' },
        { path: '/dashboard/monitor', component: './Dashboard/Monitor' },
        { path: '/dashboard/workplace', component: './Dashboard/Workplace' },

        // forms
        { path: '/form/basic-form', component: './Forms/BasicForm' },
        {
          path: '/form/step-form',
          component: './Forms/StepForm',
          routes: [
            { path: '/form/step-form', redirect: '/form/step-form/info' },
            { path: '/form/step-form/info', component: './Forms/StepForm/Step1' },
            { path: '/form/step-form/confirm', component: './Forms/StepForm/Step2' },
            { path: '/form/step-form/result', component: './Forms/StepForm/Step3' },
          ],
        },
        { path: '/form/advanced-form', component: './Forms/AdvancedForm' },

        // list
        { path: '/list/table-list', component: './List/TableList' },
        { path: '/list/table-list', component: './List/TableList' },
        { path: '/list/basic-list', component: './List/BasicList' },
        { path: '/list/card-list', component: './List/CardList' },
        {
          path: '/list/search',
          component: './List/List',
          routes: [
            { path: '/list/search', redirect: '/list/search/projects' },
            { path: '/list/search/articles', component: './List/Articles' },
            { path: '/list/search/projects', component: './List/Projects' },
            { path: '/list/search/applications', component: './List/Applications' },
          ],
        },

        // profile
        { path: '/profile/basic', component: './Profile/BasicProfile' },
        { path: '/profile/advanced', component: './Profile/AdvancedProfile' },

        // result
        { path: '/result/success', component: './Result/Success' },
        { path: '/result/fail', component: './Result/Error' },

        // exception
        { path: '/exception/403', component: './Exception/403' },
        { path: '/exception/404', component: './Exception/404' },
        { path: '/exception/500', component: './Exception/500' },

        // account
        {
          path: '/account/center',
          component: './Account/Center/Center',
          routes: [
            { path: '/account/center', redirect: '/account/center/articles' },
            { path: '/account/center/articles', component: './Account/Center/Articles' },
            { path: '/account/center/applications', component: './Account/Center/Applications' },
            { path: '/account/center/projects', component: './Account/Center/Projects' },
          ],
        },
        {
          path: '/account/settings',
          component: './Account/Settings/Info',
          routes: [
            { path: '/account/settings', redirect: '/account/settings/base' },
            { path: '/account/settings/base', component: './Account/Settings/BaseView' },
            { path: '/account/settings/security', component: './Account/Settings/SecurityView' },
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

  // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
  theme: {
    // 'primary-color': '#10e99b',
    'card-actions-background': '#f5f8fa',
  },

  // copy from old webpackrc.js

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
  // theme: './theme.js',
  // html: { TODO remove
  //   template: './index.ejs',
  // },
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
