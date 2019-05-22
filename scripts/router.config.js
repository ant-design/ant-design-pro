module.exports = [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/analysis', authority: ['admin', 'user'] },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            component: './Dashboard/Monitor',
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/Workplace',
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
            component: './Form/BasicForm',
          },
          {
            path: '/form/step-form',
            name: 'stepform',
            component: './Form/StepForm',
            hideChildrenInMenu: true,
            // routes: [
            //   {
            //     path: '/form/step-form',
            //     redirect: '/form/step-form/info',
            //   },
            //   {
            //     path: '/form/step-form/info',
            //     name: 'info',
            //     component: './Form/StepForm/Step1',
            //   },
            //   {
            //     path: '/form/step-form/confirm',
            //     name: 'confirm',
            //     component: './Form/StepForm/Step2',
            //   },
            //   {
            //     path: '/form/step-form/result',
            //     name: 'result',
            //     component: './Form/StepForm/Step3',
            //   },
            // ],
          },
          {
            path: '/form/advanced-form',
            name: 'advancedform',
            authority: ['admin'],
            component: './Form/AdvancedForm',
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
            component: './list/Tablelist',
          },
          {
            path: '/list/basic-list',
            name: 'basiclist',
            component: './list/Basiclist',
          },
          {
            path: '/list/card-list',
            name: 'cardlist',
            component: './list/Cardlist',
          },
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
                path: '/list/search/articles',
                name: 'articles',
                component: './list/Articles',
              },
              {
                path: '/list/search/projects',
                name: 'projects',
                component: './list/Projects',
              },
              {
                path: '/list/search/applications',
                name: 'applications',
                component: './list/Applications',
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
            component: './Profile/BasicProfile',
          },
          {
            path: '/profile/basic/:id',
            hideInMenu: true,
            component: './Profile/BasicProfile',
          },
          {
            path: '/profile/advanced',
            name: 'advanced',
            authority: ['admin'],
            component: './Profile/AdvancedProfile',
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
            component: './Result/Success',
          },
          { path: '/result/fail', name: 'fail', component: './Result/Error' },
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
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
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
            // routes: [
            //   {
            //     path: '/account/center',
            //     redirect: '/account/center/articles',
            //   },
            //   {
            //     path: '/account/center/articles',
            //     component: './Account/Center/Articles',
            //   },
            //   {
            //     path: '/account/center/applications',
            //     component: './Account/Center/Applications',
            //   },
            //   {
            //     path: '/account/center/projects',
            //     component: './Account/Center/Projects',
            //   },
            // ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            // routes: [
            //   {
            //     path: '/account/settings',
            //     redirect: '/account/settings/base',
            //   },
            //   {
            //     path: '/account/settings/base',
            //     component: './Account/Settings/BaseView',
            //   },
            //   {
            //     path: '/account/settings/security',
            //     component: './Account/Settings/SecurityView',
            //   },
            //   {
            //     path: '/account/settings/binding',
            //     component: './Account/Settings/BindingView',
            //   },
            //   {
            //     path: '/account/settings/notification',
            //     component: './Account/Settings/NotificationView',
            //   },
            // ],
          },
        ],
      },
      //  editor
      {
        name: 'editor',
        icon: 'highlight',
        path: '/editor',
        routes: [
          {
            path: '/editor/flow',
            name: 'flow',
            component: './Editor/GGEditor/Flow',
          },
          {
            path: '/editor/mind',
            name: 'mind',
            component: './Editor/GGEditor/Mind',
          },
          {
            path: '/editor/koni',
            name: 'koni',
            component: './Editor/GGEditor/Koni',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
