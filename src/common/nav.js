import dynamic from 'dva/dynamic';

// models
import UserModel from '../models/user';
import ChartModel from '../models/chart';
import MonitorModel from '../models/monitor';
import ProjectModel from '../models/project';
import ActivitiesModel from '../models/activities';
import FormModel from '../models/form';
import RuleModel from '../models/rule';
import ListModel from '../models/list';
import ProfileModel from '../models/profile';
import LoginModel from '../models/login';
import RegisterModel from '../models/register';

// components
import BasicLayout from '../layouts/BasicLayout';
import UserLayout from '../layouts/UserLayout';
import BlankLayout from '../layouts/BlankLayout';

import Analysis from '../routes/Dashboard/Analysis';
import Monitor from '../routes/Dashboard/Monitor';
import Workplace from '../routes/Dashboard/Workplace';

import BasicForm from '../routes/Forms/BasicForm';
import AdvancedForm from '../routes/Forms/AdvancedForm';
import StepForm from '../routes/Forms/StepForm';
import Step2 from '../routes/Forms/StepForm/Step2';
import Step3 from '../routes/Forms/StepForm/Step3';

import TableList from '../routes/List/TableList';
import BasicList from '../routes/List/BasicList';
import CardList from '../routes/List/CardList';
import CoverCardList from '../routes/List/CoverCardList';
import FilterCardList from '../routes/List/FilterCardList';
import SearchList from '../routes/List/SearchList';

import BasicProfile from '../routes/Profile/BasicProfile';
import AdvancedProfile from '../routes/Profile/AdvancedProfile';

import Success from '../routes/Result/Success';
import Error from '../routes/Result/Error';
import Exception403 from '../routes/Exception/403';
import Exception404 from '../routes/Exception/404';
import Exception500 from '../routes/Exception/500';

import Login from '../routes/User/Login';
import Register from '../routes/User/Register';
import RegisterResult from '../routes/User/RegisterResult';

// wrapper of dynamic
const dy = (app, models, component) => dynamic({
  app,
  models: () => models,
  component: () => component,
});

// nav data
export const getNavData = app => [
  {
    component: dy(app, [UserModel], BasicLayout),
    layout: 'BasicLayout',
    name: '首页', // for breadcrumb
    path: '/',
    children: [
      {
        name: 'Dashboard',
        icon: 'dashboard',
        path: 'dashboard',
        children: [
          {
            name: '分析页',
            path: 'analysis',
            component: dy(app, [ChartModel], Analysis),
          },
          {
            name: '监控页',
            path: 'monitor',
            component: dy(app, [MonitorModel], Monitor),
          },
          {
            name: '工作台',
            path: 'workplace',
            component: dy(app, [ProjectModel, ActivitiesModel, ChartModel], Workplace),
          },
        ],
      },
      {
        name: '表单页',
        path: 'form',
        icon: 'form',
        children: [
          {
            name: '基础表单',
            path: 'basic-form',
            component: dy(app, [FormModel], BasicForm),
          },
          {
            name: '分步表单',
            path: 'step-form',
            component: dy(app, [FormModel], StepForm),
            children: [
              {
                path: 'confirm',
                component: dy(app, [FormModel], Step2),
              },
              {
                path: 'result',
                component: dy(app, [FormModel], Step3),
              },
            ],
          },
          {
            name: '高级表单',
            path: 'advanced-form',
            component: dy(app, [FormModel], AdvancedForm),
          },
        ],
      }, {
        name: '列表页',
        path: 'list',
        icon: 'table',
        children: [
          {
            name: '查询表格',
            path: 'table-list',
            component: dy(app, [RuleModel], TableList),
          },
          {
            name: '标准列表',
            path: 'basic-list',
            component: dy(app, [ListModel], BasicList),
          },
          {
            name: '卡片列表',
            path: 'card-list',
            component: dy(app, [ListModel], CardList),
          },
          {
            name: '搜索列表（项目）',
            path: 'cover-card-list',
            component: dy(app, [ListModel], CoverCardList),
          },
          {
            name: '搜索列表（应用）',
            path: 'filter-card-list',
            component: dy(app, [ListModel], FilterCardList),
          },
          {
            name: '搜索列表（文章）',
            path: 'search',
            component: dy(app, [ListModel], SearchList),
          },
        ],
      },
      {
        name: '详情页',
        path: 'profile',
        icon: 'profile',
        children: [
          {
            name: '基础详情页',
            path: 'basic',
            component: dy(app, [ProfileModel], BasicProfile),
          },
          {
            name: '高级详情页',
            path: 'advanced',
            component: dy(app, [ProfileModel], AdvancedProfile),
          },
        ],
      },
      {
        name: '结果',
        path: 'result',
        icon: 'check-circle-o',
        children: [
          {
            name: '成功',
            path: 'success',
            component: dy(app, [], Success),
          },
          {
            name: '失败',
            path: 'fail',
            component: dy(app, [], Error),
          },
        ],
      },
      {
        name: '异常',
        path: 'exception',
        icon: 'warning',
        children: [
          {
            name: '403',
            path: '403',
            component: dy(app, [], Exception403),
          },
          {
            name: '404',
            path: '404',
            component: dy(app, [], Exception404),
          },
          {
            name: '500',
            path: '500',
            component: dy(app, [], Exception500),
          },
        ],
      },
    ],
  },
  {
    component: dy(app, [], UserLayout),
    path: '/user',
    layout: 'UserLayout',
    children: [
      {
        name: '帐户',
        icon: 'user',
        path: 'user',
        children: [
          {
            name: '登录',
            path: 'login',
            component: dy(app, [LoginModel], Login),
          },
          {
            name: '注册',
            path: 'register',
            component: dy(app, [RegisterModel], Register),
          },
          {
            name: '注册结果',
            path: 'register-result',
            component: dy(app, [], RegisterResult),
          },
        ],
      },
    ],
  },
  {
    component: dy(app, [], BlankLayout),
    layout: 'BlankLayout',
    children: {
      name: '使用文档',
      path: 'http://pro.ant.design/docs/getting-started',
      target: '_blank',
      icon: 'book',
    },
  },
];
