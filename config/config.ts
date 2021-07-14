// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          path: '/user/login',
          layout: false,
          name: 'login',
          component: './User/Login',
        },
        {
          path: '/user',
          redirect: '/user/login',
        },
        {
          name: 'register-result',
          icon: 'smile',
          path: '/user/register-result',
          component: './user/register-result',
        },
        {
          name: 'register',
          icon: 'smile',
          path: '/user/register',
          component: './user/register',
        },
        {
          component: '404',
        },
      ],
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      icon: 'dashboard',
      routes: [
        {
          name: 'analysis',
          icon: 'smile',
          path: '/dashboard/analysis',
          component: './dashboard/analysis',
        },
        {
          name: 'monitor',
          icon: 'smile',
          path: '/dashboard/monitor',
          component: './dashboard/monitor',
        },
        {
          name: 'workplace',
          icon: 'smile',
          path: '/dashboard/workplace',
          component: './dashboard/workplace',
        },
      ],
    },
    {
      path: '/form',
      icon: 'form',
      name: 'form',
      routes: [
        {
          name: 'basic-form',
          icon: 'smile',
          path: '/form/basic-form',
          component: './form/basic-form',
        },
        {
          name: 'step-form',
          icon: 'smile',
          path: '/form/step-form',
          component: './form/step-form',
        },
        {
          name: 'advanced-form',
          icon: 'smile',
          path: '/form/advanced-form',
          component: './form/advanced-form',
        },
      ],
    },
    {
      path: '/list',
      icon: 'table',
      name: 'list',
      routes: [
        {
          path: '/list/search',
          name: 'search-list',
          component: './list/search',
          routes: [
            {
              path: '/list/search',
              redirect: '/list/search/articles',
            },
            {
              name: 'articles',
              icon: 'smile',
              path: '/list/search/articles',
              component: './list/search/articles',
            },
            {
              name: 'projects',
              icon: 'smile',
              path: '/list/search/projects',
              component: './list/search/projects',
            },
            {
              name: 'applications',
              icon: 'smile',
              path: '/list/search/applications',
              component: './list/search/applications',
            },
          ],
        },
        {
          name: 'table-list',
          icon: 'smile',
          path: '/list/table-list',
          component: './list/table-list',
        },
        {
          name: 'basic-list',
          icon: 'smile',
          path: '/list/basic-list',
          component: './list/basic-list',
        },
        {
          name: 'card-list',
          icon: 'smile',
          path: '/list/card-list',
          component: './list/card-list',
        },
      ],
    },
    {
      path: '/profile',
      name: 'profile',
      icon: 'profile',
      routes: [
        {
          name: 'basic',
          icon: 'smile',
          path: '/profile/basic',
          component: './profile/basic',
        },
        {
          name: 'advanced',
          icon: 'smile',
          path: '/profile/advanced',
          component: './profile/advanced',
        },
      ],
    },
    {
      name: 'result',
      icon: 'CheckCircleOutlined',
      path: '/result',
      routes: [
        {
          name: 'success',
          icon: 'smile',
          path: '/result/success',
          component: './result/success',
        },
        {
          name: 'fail',
          icon: 'smile',
          path: '/result/fail',
          component: './result/fail',
        },
      ],
    },
    {
      name: 'exception',
      icon: 'warning',
      path: '/exception',
      routes: [
        {
          name: '403',
          icon: 'smile',
          path: '/exception/403',
          component: './exception/403',
        },
        {
          name: '404',
          icon: 'smile',
          path: '/exception/404',
          component: './exception/404',
        },
        {
          name: '500',
          icon: 'smile',
          path: '/exception/500',
          component: './exception/500',
        },
      ],
    },
    {
      name: 'account',
      icon: 'user',
      path: '/account',
      routes: [
        {
          name: 'center',
          icon: 'smile',
          path: '/account/center',
          component: './account/center',
        },
        {
          name: 'settings',
          icon: 'smile',
          path: '/account/settings',
          component: './account/settings',
        },
      ],
    },
    {
      name: 'editor',
      icon: 'highlight',
      path: '/editor',
      routes: [
        {
          name: 'flow',
          icon: 'smile',
          path: '/editor/flow',
          component: './editor/flow',
        },
        {
          name: 'mind',
          icon: 'smile',
          path: '/editor/mind',
          component: './editor/mind',
        },
        {
          name: 'koni',
          icon: 'smile',
          path: '/editor/koni',
          component: './editor/koni',
        },
      ],
    },
    {
      path: '/',
      redirect: '/dashboard/analysis',
    },
    {
      component: '404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // 或者使用在线的版本
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
});
