/* eslint-disable react/destructuring-assignment */

// https://umijs.org/config/

const path = require('path');

export default {
  // add for transfer to umi
  plugins: [
    'umi-plugin-dva',
    // TODO 决定是否使用约定路由，如果使用配置路由那么 umi-plugin-routes 可以去掉了
    [
      'umi-plugin-routes',
      {
        exclude: [/\.test\.js/],
      },
    ],
  ],
  disableServiceWorker: true,

  // 路由配置
  // TODO ./src/pages 太冗余了
  // routes: [{
  //   path: '/',
  //   component: './src/layouts/BasicLayout',
  //   indexRoute: { redirect: '/dashboard/analysis' },
  //   childRoutes: [

  //     // dashboard
  //     { path: 'dashboard/analysis', component: './src/pages/Dashboard/Analysis' },
  //     { path: 'dashboard/monitor', component: './src/pages/Dashboard/Monitor' },
  //     { path: 'dashboard/workplace', component: './src/pages/Dashboard/Workplace' },

  //     // forms
  //     { path: 'form/basic-form', component: './src/pages/Forms/BasicForm' },
  //     {
  //       path: 'form/step-form',
  //       component: './src/pages/Forms/StepForm',
  //       indexRoute: { redirect: '/form/step-form/info' },
  //       childRoutes: [
  //         { path: 'info', component: './src/pages/Forms/StepForm/Step1' },
  //         { path: 'confirm', component: './src/pages/Forms/StepForm/Step2' },
  //         { path: 'result', component: './src/pages/Forms/StepForm/Step3' },
  //       ],
  //     },
  //     { path: 'form/advanced-form', component: './src/pages/Forms/AdvancedForm' },

  //     // list
  //     { path: 'list/table-list', component: './src/pages/List/TableList' },
  //     { path: 'list/table-list', component: './src/pages/List/TableList' },
  //     { path: 'list/basic-list', component: './src/pages/List/BasicList' },
  //     { path: 'list/card-list', component: './src/pages/List/CardList' },
  //     {
  //       path: 'list/search',
  //       component: './src/pages/List/List',
  //       indexRoute: { redirect: '/list/search/projects' },
  //       childRoutes: [
  //         { path: 'articles', component: './src/pages/List/Articles' },
  //         { path: 'projects', component: './src/pages/List/Projects' },
  //         { path: 'applications', component: './src/pages/List/Applications' },
  //       ],
  //     },

  //     // profile
  //     { path: 'profile/basic', component: './src/pages/Profile/BasicProfile' },
  //     { path: 'profile/advanced', component: './src/pages/Profile/AdvancedProfile' },

  //     // result
  //     { path: 'result/success', component: './src/pages/Result/Success' },
  //     { path: 'result/fail', component: './src/pages/Result/Error' },

  //     // exception
  //     { path: 'exception/403', component: './src/pages/Exception/403' },
  //     { path: 'exception/404', component: './src/pages/Exception/404' },
  //     { path: 'exception/500', component: './src/pages/Exception/500' },

  // //   ],
  // }],

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
  theme: './src/theme.js',
  // html: { TODO remove
  //   template: './src/index.ejs',
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
};
