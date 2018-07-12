// TODO:remove
// import { isUrl } from '../utils/utils';

// const menuData = [
//   {
//     name: 'dashboard',
//     icon: 'dashboard',
//     path: 'dashboard',
//     children: [
//       {
//         name: '分析页',
//         path: 'analysis',
//       },
//       {
//         name: '监控页',
//         path: 'monitor',
//       },
//       {
//         name: '工作台',
//         path: 'workplace',
//         // hideInBreadcrumb: true,
//         // hideInMenu: true,
//       },
//     ],
//   },
//   {
//     name: '表单页',
//     icon: 'form',
//     path: 'form',
//     children: [
//       {
//         name: '基础表单',
//         path: 'basic-form',
//       },
//       {
//         name: '分步表单',
//         path: 'step-form',
//       },
//       {
//         name: '高级表单',
//         authority: 'admin',
//         path: 'advanced-form',
//       },
//     ],
//   },
//   {
//     name: '列表页',
//     icon: 'table',
//     path: 'list',
//     children: [
//       {
//         name: '查询表格',
//         path: 'table-list',
//       },
//       {
//         name: '标准列表',
//         path: 'basic-list',
//       },
//       {
//         name: '卡片列表',
//         path: 'card-list',
//       },
//       {
//         name: '搜索列表',
//         path: 'search',
//         children: [
//           {
//             name: '搜索列表（文章）',
//             path: 'articles',
//           },
//           {
//             name: '搜索列表（项目）',
//             path: 'projects',
//           },
//           {
//             name: '搜索列表（应用）',
//             path: 'applications',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: '详情页',
//     icon: 'profile',
//     path: 'profile',
//     children: [
//       {
//         name: '基础详情页',
//         path: 'basic',
//       },
//       {
//         name: '高级详情页',
//         path: 'advanced',
//         authority: 'admin',
//       },
//     ],
//   },
//   {
//     name: '结果页',
//     icon: 'check-circle-o',
//     path: 'result',
//     children: [
//       {
//         name: '成功',
//         path: 'success',
//       },
//       {
//         name: '失败',
//         path: 'fail',
//       },
//     ],
//   },
//   {
//     name: '异常页',
//     icon: 'warning',
//     path: 'exception',
//     children: [
//       {
//         name: '403',
//         path: '403',
//       },
//       {
//         name: '404',
//         path: '404',
//       },
//       {
//         name: '500',
//         path: '500',
//       },
//       {
//         name: '触发异常',
//         path: 'trigger',
//         hideInMenu: true,
//       },
//     ],
//   },
//   {
//     name: '账户',
//     icon: 'user',
//     path: 'user',
//     authority: 'guest',
//     children: [
//       {
//         name: '登录',
//         path: 'login',
//       },
//       {
//         name: '注册',
//         path: 'register',
//       },
//       {
//         name: '注册结果',
//         path: 'register-result',
//       },
//     ],
//   },
//   {
//     name: '个人页',
//     icon: 'user',
//     path: 'account',
//     children: [
//       {
//         name: '个人中心',
//         path: 'center',
//       },
//       {
//         name: '个人设置',
//         path: 'settings',
//       },
//     ],
//   },
// ];

// function formatter(data, parentPath = '/', parentAuthority) {
//   return data.map(item => {
//     let { path } = item;
//     if (!isUrl(path)) {
//       path = parentPath + item.path;
//     }
//     const result = {
//       ...item,
//       path,
//       authority: item.authority || parentAuthority,
//     };
//     if (item.children) {
//       result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
//     }
//     return result;
//   });
// }

// export const getMenuData = () => formatter(menuData);

import { isUrl } from '../utils/utils';

// TODO: authority
const menuData = [
  {
    name: 'dashboard',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: 'analysis',
        path: 'analysis',
      },
      {
        name: 'monitor',
        path: 'monitor',
      },
      {
        name: 'workplace',
        path: 'workplace',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
    ],
  },
  {
    name: 'form',
    icon: 'form',
    path: 'form',
    children: [
      {
        name: 'basicform',
        path: 'basic-form',
      },
      {
        name: 'stepform',
        path: 'step-form',
      },
      {
        // authority: 'admin',
        name: 'advancedform',
        authority: 'admin',
        path: 'advanced-form',
      },
    ],
  },
  {
    name: 'list',
    icon: 'table',
    path: 'list',
    children: [
      {
        name: 'searchlist',
        path: 'table-list',
      },
      {
        name: 'basiclist',
        path: 'basic-list',
      },
      {
        name: 'cardlist',
        path: 'card-list',
      },
      {
        name: 'searchlist',
        path: 'search',
        children: [
          {
            name: 'articles',
            path: 'articles',
          },
          {
            name: 'projects',
            path: 'projects',
          },
          {
            name: 'applications',
            path: 'applications',
          },
        ],
      },
    ],
  },
  {
    name: 'profile',
    icon: 'profile',
    path: 'profile',
    children: [
      {
        name: 'basic',
        path: 'basic',
      },
      {
        name: 'advanced',
        path: 'advanced',
        // authority: 'admin',
      },
    ],
  },
  {
    name: 'result',
    icon: 'check-circle-o',
    path: 'result',
    children: [
      {
        name: 'success',
        path: 'success',
      },
      {
        name: 'fail',
        path: 'fail',
      },
    ],
  },
  {
    name: 'exception',
    icon: 'warning',
    path: 'exception',
    children: [
      {
        name: 'not-permission',
        path: '403',
      },
      {
        name: 'not-find',
        path: '404',
      },
      {
        name: 'server-error',
        path: '500',
      },
      {
        name: 'trigger',
        path: 'trigger',
        hideInMenu: true,
      },
    ],
  },
  {
    name: 'account',
    icon: 'user',
    path: 'account',
    children: [
      {
        name: 'center',
        path: 'center',
      },
      {
        name: 'settings',
        path: 'settings',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority, parentName) {
  return data.map(item => {
    let { path } = item;
    const id = parentName ? `${parentName}.${item.name}` : `menu.${item.name}`;

    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      locale: id,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority, id);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
