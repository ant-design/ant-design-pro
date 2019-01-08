export default {
  '/api/auth_routes': [
    // user
    {
      path: '/user',
      component: './layouts/UserLayout',
      routes: [
        { path: '/user', redirect: '/user/login' },
        { path: '/user/login', component: './pages/User/Login' },
        { path: '/user/register', component: './pages/User/Register' },
        { path: '/user/register-result', component: './pages/User/RegisterResult' },
      ],
    },
    // app
    {
      path: '/',
      component: './layouts/BasicLayout',
      authority: ['admin', 'user'],
      routes: [
        // dashboard
        { path: '/', redirect: '/dashboard/analysis' },
        {
          path: '/dashboard',
          name: 'dashboard',
          icon: 'dashboard',
          routes: [
            {
              path: '/dashboard/analysis',
              name: 'analysis',
              component: './pages/Dashboard/Analysis',
            },
            {
              path: '/dashboard/monitor',
              name: 'monitor',
              component: './pages/Dashboard/Monitor',
            },
            {
              path: '/dashboard/workplace',
              name: 'workplace',
              component: './pages/Dashboard/Workplace',
            },
          ],
        },
        // forms
        {
          path: '/form',
          icon: 'form',
          name: 'form',
          routes: [
            {
              path: '/form/basic-form',
              name: 'basicform',
              component: './pages/Forms/BasicForm',
            },
            {
              path: '/form/step-form',
              name: 'stepform',
              component: './pages/Forms/StepForm',
              hideChildrenInMenu: true,
              routes: [
                {
                  path: '/form/step-form',
                  redirect: '/form/step-form/info',
                },
                {
                  path: '/form/step-form/info',
                  name: 'info',
                  component: './pages/Forms/StepForm/Step1',
                },
                {
                  path: '/form/step-form/confirm',
                  name: 'confirm',
                  component: './pages/Forms/StepForm/Step2',
                },
                {
                  path: '/form/step-form/result',
                  name: 'result',
                  component: './pages/Forms/StepForm/Step3',
                },
              ],
            },
            {
              path: '/form/advanced-form',
              name: 'advancedform',
              authority: ['admin'],
              component: './pages/Forms/AdvancedForm',
            },
          ],
        },
        // list
        {
          path: '/list',
          icon: 'table',
          name: 'list',
          routes: [
            {
              path: '/list/table-list',
              name: 'searchtable',
              component: './pages/List/TableList',
            },
            {
              path: '/list/basic-list',
              name: 'basiclist',
              component: './pages/List/BasicList',
            },
            {
              path: '/list/card-list',
              name: 'cardlist',
              component: './pages/List/CardList',
            },
            {
              path: '/list/search',
              name: 'searchlist',
              component: './pages/List/List',
              routes: [
                {
                  path: '/list/search',
                  redirect: '/list/search/articles',
                },
                {
                  path: '/list/search/articles',
                  name: 'articles',
                  component: './pages/List/Articles',
                },
                {
                  path: '/list/search/projects',
                  name: 'projects',
                  component: './pages/List/Projects',
                },
                {
                  path: '/list/search/applications',
                  name: 'applications',
                  component: './pages/List/Applications',
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
            {
              path: '/profile/basic',
              name: 'basic',
              component: './pages/Profile/BasicProfile',
            },
            {
              path: '/profile/advanced',
              name: 'advanced',
              authority: ['admin'],
              component: './pages/Profile/AdvancedProfile',
            },
          ],
        },
        {
          name: 'result',
          icon: 'check-circle-o',
          path: '/result',
          routes: [
            // result
            {
              path: '/result/success',
              name: 'success',
              component: './pages/Result/Success',
            },
            { path: '/result/fail', name: 'fail', component: './pages/Result/Error' },
          ],
        },
        {
          name: 'exception',
          icon: 'warning',
          path: '/exception',
          routes: [
            // exception
            {
              path: '/exception/403',
              name: 'not-permission',
              component: './pages/Exception/403',
            },
            {
              path: '/exception/404',
              name: 'not-find',
              component: './pages/Exception/404.js',
            },
            {
              path: '/exception/500',
              name: 'server-error',
              component: './pages/Exception/500.js',
            },
            {
              path: '/exception/trigger',
              name: 'trigger',
              hideInMenu: true,
              component: './pages/Exception/TriggerException',
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
              component: './pages/Account/Center/Center',
              routes: [
                {
                  path: '/account/center',
                  redirect: '/account/center/articles',
                },
                {
                  path: '/account/center/articles',
                  component: './pages/Account/Center/Articles',
                },
                {
                  path: '/account/center/applications',
                  component: './pages/Account/Center/Applications',
                },
                {
                  path: '/account/center/projects',
                  component: './pages/Account/Center/Projects',
                },
              ],
            },
            {
              path: '/account/settings',
              name: 'settings',
              component: './pages/Account/Settings/Info',
              routes: [
                {
                  path: '/account/settings',
                  redirect: '/account/settings/base',
                },
                {
                  path: '/account/settings/base',
                  component: './pages/Account/Settings/BaseView',
                },
                {
                  path: '/account/settings/security',
                  component: './pages/Account/Settings/SecurityView',
                },
                {
                  path: '/account/settings/binding',
                  component: './pages/Account/Settings/BindingView',
                },
                {
                  path: '/account/settings/notification',
                  component: './pages/Account/Settings/NotificationView',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
