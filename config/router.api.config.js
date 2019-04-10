export default [
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
    routes: [
      // dashboard
      { path: '/', redirect: '/apiGateway/apiList', authority: ['admin', 'user'] },
      // apiGateWay
      {
        path: '/apiGateway',
        icon: 'table',
        name: 'apiGateway',
        routes: [
          {
            path: '/apiGateway/apiList',
            name: 'apiList',
            component: './ApiGateway/ApiList',
          },
          {
            path: '/apiGateway/apiUpdate',
            name: 'apiUpdate',
            component: './ApiGateway/ApiUpdate',
          },
          {
            path: '/apiGateway/apiCreate',
            name: 'apiCreate',
            component: './ApiGateway/ApiCreate',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/apiGateway/apiCreate',
                redirect: '/apiGateway/apiCreate/info',
              },
              {
                path: '/apiGateway/apiCreate/info',
                name: 'info',
                component: './ApiGateway/ApiCreate/Step1',
              },
              {
                path: '/apiGateway/apiCreate/consumer',
                name: 'consumer',
                component: './ApiGateway/ApiCreate/Step2',
              },
              {
                path: '/apiGateway/apiCreate/producer',
                name: 'producer',
                component: './ApiGateway/ApiCreate/Step3',
              },
              {
                path: '/apiGateway/apiCreate/result',
                name: 'result',
                component: './ApiGateway/ApiCreate/Step4',
              },
            ],
          },
        ],
      },
      // uniComp
      {
        path: '/uniComp',
        icon: 'table',
        name: 'uniComp',
        authority: ['manager'],
        routes: [
          {
            path: '/uniComp/org',
            name: 'org',
            component: './UniComp/Org',
          },
          {
            path: '/uniComp/group',
            name: 'group',
            component: './UniComp/Group',
          },
          {
            path: '/uniComp/component',
            name: 'component',
            component: './UniComp/Component',
          },
        ],
      },
      // test
      {
        path: '/test',
        icon: 'table',
        name: 'test',
        routes: [
          {
            path: '/test/test1',
            name: 'test1',
            component: './Test/Test1',
          },
          {
            path: '/test/test2',
            name: 'test2',
            component: './Test/Test2',
          },
          {
            path: '/test/test3',
            name: 'test3',
            component: './Test/Test3',
          },
          {
            path: '/test/test4',
            name: 'test4',
            component: './Test/Test4',
          },
          {
            path: '/test/orgTransfer',
            name: 'orgTransfer',
            component: './Test/OrgTransfer',
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
