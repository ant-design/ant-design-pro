module.exports = [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/analysis' },
      {
        path: '/face',
        name: 'face',
        icon: 'user',
        routes: [
          {
            path: '/face/wall',
            name: 'wall',
            component: './AAGeitpay/Wall/TableList',
          },
          {
            path: '/face/list',
            name: 'facelist',
            component: './AAGeitpay/Face/TableList',
          },
          {
            path: '/face/type',
            name: 'facetype',
            component: './AAGeitpay/Facetype/TableList',
          },
          
        ],
      },
      {
        path: '/dev',
        name: 'dev',
        icon: 'tool',
        routes: [
          {
            path: '/dev/log',
            name: 'log',
            component: './AAGeitpay/Log/TableList',
          },
        ],
      },
      {
        path: '/system',
        name: 'system',
        icon: 'setting',
        routes: [
          {
            path: '/system/menu',
            name: 'menu',
            component: './AAGeitpay/Menu/TableList',
          },
          {
            path: '/system/role',
            name: 'role',
            component: './AAGeitpay/Role/TableList',
          },
          {
            path: '/system/user',
            name: 'user',
            component: './AAGeitpay/User/TableList',
          },
        ],
      },
      {
        path: '/basic',
        name: 'basic',
        icon: 'appstore-o',
        routes: [
          {
            path: '/basic/order-type',
            name: 'order-type',
            component: './AAGeitpay/OrderType/TableList',
          },
          {
            path: '/basic/channel-type',
            name: 'channel-type',
            component: './AAGeitpay/ChannelType/TableList',
          },
          {
            path: '/basic/third',
            name: 'third',
            component: './AAGeitpay/Third/TableList',
          },
          {
            path: '/basic/pay-type',
            name: 'pay-type',
            component: './AAGeitpay/PayType/TableList',
          },
          {
            path: '/basic/third-return',
            name: 'third-return',
            component: './AAGeitpay/ThirdReturn/TableList',
          },
          {
            path: '/basic/third-state',
            name: 'third-state',
            component: './AAGeitpay/ThirdState/TableList',
          },
          {
            path: '/basic/trans-type',
            name: 'trans-type',
            component: './AAGeitpay/TransType/TableList',
          },
          {
            path: '/basic/error-code',
            name: 'error-code',
            component: './AAGeitpay/ErrorCode/TableList',
          },
          {
            path: '/basic/merchant',
            name: 'merchant',
            component: './AAGeitpay/Merchant/TableList',
          },
          {
            path: '/basic/merchant-acc',
            name: 'merchant-acc',
            component: './AAGeitpay/MerchantAcc/TableList',
          },
          {
            path: '/basic/casher',
            name: 'casher',
            component: './AAGeitpay/Casher/TableList',
          },
          {
            path: '/basic/industry',
            name: 'industry',
            component: './AAGeitpay/Industry/TableList',
          },
          {
            path: '/basic/order',
            name: 'order',
            component: './AAGeitpay/Order/TableList',
          },
        ],
      },
      {
        path: '/trans',
        name: 'trans',
        icon: 'pay-circle-o',
        routes: [
          {
            path: '/trans/order-pay',
            name: 'order-pay',
            component: './AAGeitpay/OrderPay/TableList',
          },
          {
            path: '/trans/return',
            name: 'return',
            component: './AAGeitpay/Return/TableList',
          },
          {
            path: '/trans/settle',
            name: 'settle',
            component: './AAGeitpay/Settle/TableList',
          },
          {
            path: '/trans/relation',
            name: 'relation',
            component: './AAGeitpay/Relation/TableList',
          },
          {
            path: '/trans/order',
            name: 'order',
            component: './AAGeitpay/Order/TableList',
          },
          {
            path: '/trans/test',
            name: 'test',
            component: './AAGeitpay/Test/TableList',
          },
          {
            path: '/trans/ttest',
            name: 'ttest',
            component: './AAGeitpay/Test/TTableList',
          },
        ],
      },
      // {
      //   path: '/chart',
      //   name: 'chart',
      //   icon: 'dashboard',
      //   routes: [
      //     {
      //       path: '/chart/dashboard',
      //       name: 'dashboard',
      //       component: './AAGeitpay/Dashboard/Analysis',
      //     },
      //   ],
      // },

      // {
      //   path: '/test',
      //   name: 'test',
      //   icon: '',
      //   routes: [
      //     {
      //       path: '/test/advanced-form',
      //       name: 'advanced-form',
      //       component: './AATest/Form/AdvancedForm',
      //     },
      //     { path: '/test/form', name: 'form', component: './AATest/Form/Form' },
      //     { path: '/test/table-list', name: 'table-list', component: './AATest/Table/TableList' },
      //   ],
      // },

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
            component: './Forms/BasicForm',
          },
          {
            path: '/form/step-form',
            name: 'stepform',
            component: './Forms/StepForm',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/form/step-form',
                name: 'stepform',
                redirect: '/form/step-form/info',
              },
              {
                path: '/form/step-form/info',
                name: 'info',
                component: './Forms/StepForm/Step1',
              },
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
          {
            path: '/list/table-list',
            name: 'searchtable',
            component: './List/TableList',
          },
          {
            path: '/list/basic-list',
            name: 'basiclist',
            component: './List/BasicList',
          },
          {
            path: '/list/card-list',
            name: 'cardlist',
            component: './List/CardList',
          },
          {
            path: '/list/search',
            name: 'searchlist',
            component: './List/List',
            routes: [
              {
                path: '/list/search',
                redirect: '/list/search/articles',
              },
              {
                path: '/list/search/articles',
                name: 'articles',
                component: './List/Articles',
              },
              {
                path: '/list/search/projects',
                name: 'projects',
                component: './List/Projects',
              },
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
          {
            path: '/profile/basic',
            name: 'basic',
            component: './Profile/BasicProfile',
          },
          {
            path: '/profile/advanced',
            name: 'advanced',
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
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
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
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
