import dynamic from 'dva/dynamic';

const data = [{
  component: app => dynamic({
    app,
    component: () => import('../layouts/BasicLayout'),
  }),
  layout: 'BasicLayout',
  name: '首页', // for breadcrumb
  path: '',
  children: [{
    name: 'Dashboard',
    icon: 'dashboard',
    path: 'dashboard',
    children: [{
      name: '分析页',
      path: 'analysis',
      component: app => dynamic({
        app,
        component: () => import('../routes/Dashboard/Analysis'),
      }),
    }, {
      name: '监控页',
      path: 'monitor',
      component: app => dynamic({
        app,
        component: () => import('../routes/Dashboard/Monitor'),
      }),
    }, {
      name: '工作台',
      path: 'workplace',
      component: app => dynamic({
        app,
        component: () => import('../routes/Dashboard/Workplace'),
      }),
    }],
  }, {
    name: '表单页',
    path: 'form',
    icon: 'form',
    children: [{
      name: '基础表单',
      path: 'basic-form',
      component: app => dynamic({
        app,
        component: () => import('../routes/Forms/BasicForm'),
      }),
    }, {
      name: '分步表单',
      path: 'step-form',
      component: app => dynamic({
        app,
        component: () => import('../routes/Forms/StepForm'),
      }),
      children: [{
        path: 'confirm',
        component: app => dynamic({
          app,
          component: () => import('../routes/Forms/StepForm/Step2'),
        }),
      }, {
        path: 'result',
        component: app => dynamic({
          app,
          component: () => import('../routes/Forms/StepForm/Step3'),
        }),
      }],
    }, {
      name: '高级表单',
      path: 'advanced-form',
      component: app => dynamic({
        app,
        component: () => import('../routes/Profile/AdvancedProfile'),
      }),
    }],
  }, {
    name: '列表页',
    path: 'list',
    icon: 'table',
    children: [{
      name: '查询表格',
      path: 'table-list',
      component: app => dynamic({
        app,
        component: () => import('../routes/List/TableList'),
      }),
    }, {
      name: '标准列表',
      path: 'basic-list',
      component: app => dynamic({
        app,
        component: () => import('../routes/List/BasicList'),
      }),
    }, {
      name: '卡片列表',
      path: 'card-list',
      component: app => dynamic({
        app,
        component: () => import('../routes/List/CardList'),
      }),
    }, {
      name: '搜索列表（项目）',
      path: 'cover-card-list',
      component: app => dynamic({
        app,
        component: () => import('../routes/List/CoverCardList'),
      }),
    }, {
      name: '搜索列表（应用）',
      path: 'filter-card-list',
      component: app => dynamic({
        app,
        component: () => import('../routes/List/FilterCardList'),
      }),
    }, {
      name: '搜索列表（文章）',
      path: 'search',
      component: app => dynamic({
        app,
        component: () => import('../routes/List/SearchList'),
      }),
    }],
  }, {
    name: '详情页',
    path: 'profile',
    icon: 'profile',
    children: [{
      name: '基础详情页',
      path: 'basic',
      component: app => dynamic({
        app,
        component: () => import('../routes/Profile/BasicProfile'),
      }),
    }, {
      name: '高级详情页',
      path: 'advanced',
      component: app => dynamic({
        app,
        component: () => import('../routes/Profile/AdvancedProfile'),
      }),
    }],
  }, {
    name: '结果',
    path: 'result',
    icon: 'check-circle-o',
    children: [{
      name: '成功',
      path: 'success',
      component: app => dynamic({
        app,
        component: () => import('../routes/Result/Success'),
      }),
    }, {
      name: '失败',
      path: 'fail',
      component: app => dynamic({
        app,
        component: () => import('../routes/Result/Error'),
      }),
    }],
  }, {
    name: '异常',
    path: 'exception',
    icon: 'warning',
    children: [{
      name: '403',
      path: '403',
      component: app => dynamic({
        app,
        component: () => import('../routes/Exception/403'),
      }),
    }, {
      name: '404',
      path: '404',
      component: app => dynamic({
        app,
        component: () => import('../routes/Exception/404'),
      }),
    }, {
      name: '500',
      path: '500',
      component: app => dynamic({
        app,
        component: () => import('../routes/Exception/500'),
      }),
    }],
  }],
}, {
  component: app => dynamic({
    app,
    component: () => import('../layouts/UserLayout'),
  }),
  layout: 'UserLayout',
  children: [{
    name: '帐户',
    icon: 'user',
    path: 'user',
    children: [{
      name: '登录',
      path: 'login',
      component: app => dynamic({
        app,
        component: () => import('../routes/User/Login'),
      }),
    }, {
      name: '注册',
      path: 'register',
      component: app => dynamic({
        app,
        component: () => import('../routes/User/Register'),
      }),
    }, {
      name: '注册结果',
      path: 'register-result',
      component: app => dynamic({
        app,
        component: () => import('../routes/User/RegisterResult'),
      }),
    }],
  }],
}, {
  component: app => dynamic({
    app,
    component: () => import('../layouts/BlankLayout'),
  }),
  layout: 'BlankLayout',
  children: {
    name: '使用文档',
    path: 'http://pro.ant.design/docs/getting-started',
    target: '_blank',
    icon: 'book',
  },
}];

export function getNavData() {
  return data;
}

export default data;
