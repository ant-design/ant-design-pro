import component from "@/locales/bn-BD/component";

export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  { path: '/dashboard/workplace', name: '工作台', icon: 'dashboard', component: './dashboard'},
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
    ],
  },
  { name: '设备列表', icon: 'table', path: '/list/device-list', component: './TableList' },
  { name: '设备分组', icon: 'table', path: '/list/group-list', component: './TableList/group' },
  { name: '记录列表', icon: 'table', path: '/list/basic-list', component: './TableList/list' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
