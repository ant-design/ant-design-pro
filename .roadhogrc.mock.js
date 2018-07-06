import mockjs from 'mockjs';
import { getRule, postRule } from './mock/rule';
import { getActivities, getNotice, getFakeList, postFakeList, getFakeCaptcha } from './mock/api';
import { getFakeChartData } from './mock/chart';
import { getProfileBasicData } from './mock/profile';
import { getProfileAdvancedData } from './mock/profile';
import { getNotices } from './mock/notices';
import { getProvince, getCity } from './mock/geographic';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    name: 'Serati Ma',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'antdesign@alipay.com',
    signature: '海纳百川，有容乃大',
    title: '交互专家',
    group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
    tags: [
      {
        key: '0',
        label: '很有想法的',
      },
      {
        key: '1',
        label: '专注设计',
      },
      {
        key: '2',
        label: '辣~',
      },
      {
        key: '3',
        label: '大长腿',
      },
      {
        key: '4',
        label: '川妹子',
      },
      {
        key: '5',
        label: '海纳百川',
      },
    ],
    notifyCount: 12,
    country: 'China',
    geographic: {
      province: {
        label: '浙江省',
        key: '330000',
      },
      city: {
        label: '杭州市',
        key: '330100',
      },
    },
    address: '西湖区工专路 77 号',
    phone: '0752-268888888',
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'GET /api/project/notice': getNotice,
  'GET /api/activities': getActivities,
  'GET /api/rule': getRule,
  'POST /api/rule': postRule,
  'POST /api/forms': (req, res) => {
    res.send({ message: 'Ok' });
  },
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
  }),
  'GET /api/fake_list': getFakeList,
  'POST /api/fake_list': postFakeList,
  'GET /api/fake_chart_data': getFakeChartData,
  'GET /api/profile/basic': getProfileBasicData,
  'GET /api/profile/advanced': getProfileAdvancedData,
  'POST /api/login/account': (req, res) => {
    const { password, userName, type } = req.body;
    if (password === '888888' && userName === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }
    if (password === '123456' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/notices': getNotices,
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/geographic/province': getProvince,
  'GET /api/geographic/city/:province': getCity,
  'GET /api/captcha': getFakeCaptcha,
  'GET /api/currentMenu': [
    {
      name: 'dashboard',
      icon: 'dashboard',
      path: 'dashboard',
      children: [
        {
          name: '分析页',
          path: 'analysis',
        },
        {
          name: '监控页',
          path: 'monitor',
        },
        {
          name: '工作台',
          path: 'workplace',
          // hideInBreadcrumb: true,
          // hideInMenu: true,
        },
      ],
    },
    {
      name: '表单页',
      icon: 'form',
      path: 'form',
      children: [
        {
          name: '基础表单',
          path: 'basic-form',
        },
        {
          name: '分步表单',
          path: 'step-form',
        },
        {
          name: '高级表单',
          authority: 'admin',
          path: 'advanced-form',
        },
      ],
    },
    {
      name: '列表页',
      icon: 'table',
      path: 'list',
      children: [
        {
          name: '查询表格',
          path: 'table-list',
        },
        {
          name: '标准列表',
          path: 'basic-list',
        },
        {
          name: '卡片列表',
          path: 'card-list',
        },
        {
          name: '搜索列表',
          path: 'search',
          children: [
            {
              name: '搜索列表（文章）',
              path: 'articles',
            },
            {
              name: '搜索列表（项目）',
              path: 'projects',
            },
            {
              name: '搜索列表（应用）',
              path: 'applications',
            },
          ],
        },
      ],
    },
    {
      name: '详情页',
      icon: 'profile',
      path: 'profile',
      children: [
        {
          name: '基础详情页',
          path: 'basic',
        },
        {
          name: '高级详情页',
          path: 'advanced',
          authority: 'admin',
        },
      ],
    },
    {
      name: '结果页',
      icon: 'check-circle-o',
      path: 'result',
      children: [
        {
          name: '成功',
          path: 'success',
        },
        {
          name: '失败',
          path: 'fail',
        },
      ],
    },
    {
      name: '异常页',
      icon: 'warning',
      path: 'exception',
      children: [
        {
          name: '403',
          path: '403',
        },
        {
          name: '404',
          path: '404',
        },
        {
          name: '500',
          path: '500',
        },
        {
          name: '触发异常',
          path: 'trigger',
          hideInMenu: true,
        },
      ],
    },
    {
      name: '账户',
      icon: 'user',
      path: 'user',
      authority: 'guest',
      children: [
        {
          name: '登录',
          path: 'login',
        },
        {
          name: '注册',
          path: 'register',
        },
        {
          name: '注册结果',
          path: 'register-result',
        },
      ],
    },
    {
      name: '个人页',
      icon: 'user',
      path: 'account',
      children: [
        {
          name: '个人中心',
          path: 'center',
        },
        {
          name: '个人设置',
          path: 'settings',
        },
      ],
    },
  ],
};

export default (noProxy ? {} : proxy);
