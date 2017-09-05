import BasicLayout from '../layouts/BasicLayout';
import UserLayout from '../layouts/UserLayout';

import Analysis from '../routes/Dashboard/Analysis';
import Monitor from '../routes/Dashboard/Monitor';
import Workplace from '../routes/Dashboard/Workplace';

import TableList from '../routes/List/TableList';
import CoverCardList from '../routes/List/CoverCardList';
import CardList from '../routes/List/CardList';
import FilterCardList from '../routes/List/FilterCardList';
import SearchList from '../routes/List/SearchList';
import BasicList from '../routes/List/BasicList';

import Profile from '../routes/Profile';
import BasicForm from '../routes/Forms/BasicForm';
import AdvancedForm from '../routes/Forms/AdvancedForm';
import StepForm from '../routes/Forms/StepForm';
import Step2 from '../routes/Forms/StepForm/Step2';
import Step3 from '../routes/Forms/StepForm/Step3';

import Exception403 from '../routes/Exception/403';
import Exception404 from '../routes/Exception/404';
import Exception500 from '../routes/Exception/500';

import Success from '../routes/Result/Success';
import Error from '../routes/Result/Error';

import Login from '../routes/User/Login';
import Register from '../routes/User/Register';
import RegisterResult from '../routes/User/RegisterResult';

function userAdapter(userData) {
  userData.children.forEach((item) => {
    if (item.children) {
      userAdapter(item);
    } else {
      const userItem = item;
      userItem.noRoute = true;
    }
  });
  return userData;
}

export const user = [{
  name: '帐户',
  icon: 'user',
  path: 'user',
  children: [{
    name: '登录',
    path: 'login',
    component: Login,
  }, {
    name: '注册',
    path: 'register',
    component: Register,
  }, {
    name: '注册结果',
    path: 'register-result',
    component: RegisterResult,
  }],
}];

export const menus = [{
  name: 'Dashboard',
  icon: 'dashboard',
  path: 'dashboard',
  children: [{
    name: '分析页',
    path: 'analysis',
    component: Analysis,
  }, {
    name: '监控页',
    path: 'monitor',
    component: Monitor,
  }, {
    name: '工作台',
    path: 'workplace',
    component: Workplace,
  }],
}, {
  name: '表单页',
  path: 'form',
  icon: 'form',
  children: [{
    name: '基础表单',
    path: 'basic-form',
    component: BasicForm,
  }, {
    name: '分步表单',
    path: 'step-form',
    component: StepForm,
    children: [{
      path: 'confirm',
      component: Step2,
    }, {
      path: 'result',
      component: Step3,
    }],
  }, {
    name: '高级表单',
    path: 'advanced-form',
    component: AdvancedForm,
  }],
}, {
  name: '列表页',
  path: 'list',
  icon: 'table',
  children: [{
    name: '标准表格（表格查询）',
    path: 'table-list',
    component: TableList,
  }, {
    name: '标准列表',
    path: 'basic-list',
    component: BasicList,
  }, {
    name: '卡片列表',
    path: 'card-list',
    component: CardList,
  }, {
    name: '卡片列表（封面）',
    path: 'cover-card-list',
    component: CoverCardList,
  }, {
    name: '带筛选卡片列表',
    path: 'filter-card-list',
    component: FilterCardList,
  }, {
    name: '搜索列表',
    path: 'search',
    component: SearchList,
  }],
}, {
  name: '详情页',
  path: 'profile',
  component: Profile,
  icon: 'profile',
}, {
  name: '结果',
  path: 'result',
  icon: 'check-circle-o',
  children: [{
    name: '成功',
    path: 'success',
    component: Success,
  }, {
    name: '失败',
    path: 'fail',
    component: Error,
  }],
}, {
  name: '错误',
  path: 'error',
  icon: 'warning',
  children: [{
    name: '403',
    path: '403',
    component: Exception403,
  }, {
    name: '404',
    path: '404',
    component: Exception404,
  }, {
    name: '500',
    path: '500',
    component: Exception500,
  }],
}, userAdapter(JSON.parse(JSON.stringify(user[0])))];

export default [{
  component: BasicLayout,
  name: '首页',
  children: menus,
  path: '',
}, {
  component: UserLayout,
  name: '账户',
  children: user,
}];
