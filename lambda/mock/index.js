(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('mockjs'), require('moment')) :
  typeof define === 'function' && define.amd ? define(['mockjs', 'moment'], factory) :
  (global = global || self, global.mock = factory(global.mockjs, global.moment));
}(this, function (mockjs, moment) { 'use strict';

  mockjs = mockjs && mockjs.hasOwnProperty('default') ? mockjs['default'] : mockjs;
  moment = moment && moment.hasOwnProperty('default') ? moment['default'] : moment;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  const titles = ['Alipay', 'Angular', 'Ant Design', 'Ant Design Pro', 'Bootstrap', 'React', 'Vue', 'Webpack'];
  const avatars = ['https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // Alipay
  'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
  'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // Ant Design
  'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', // Ant Design Pro
  'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
  'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', // React
  'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', // Vue
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png'];
  const avatars2 = ['https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png', 'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png', 'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png', 'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png', 'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png', 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png', 'https://gw.alipayobjects.com/zos/rmsportal/psOgztMplJMGpVEqfcgF.png', 'https://gw.alipayobjects.com/zos/rmsportal/ZpBqSxLxVEXfcUNoPKrz.png', 'https://gw.alipayobjects.com/zos/rmsportal/laiEnJdGHVOhJrUShBaJ.png', 'https://gw.alipayobjects.com/zos/rmsportal/UrQsqscbKEpNuJcvBZBu.png'];
  const covers = ['https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png', 'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png', 'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png', 'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png'];
  const desc = ['那是一种内在的东西， 他们到达不了，也无法触及的', '希望是一个好东西，也许是最好的，好东西是不会消亡的', '生命就像一盒巧克力，结果往往出人意料', '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆', '那时候我只会想自己想要什么，从不想自己拥有什么'];
  const user = ['付小小', '曲丽丽', '林东东', '周星星', '吴加好', '朱偏右', '鱼酱', '乐哥', '谭小仪', '仲尼'];

  function fakeList(count) {
    const list = [];

    for (let i = 0; i < count; i += 1) {
      list.push({
        id: `fake-list-${i}`,
        owner: user[i % 10],
        title: titles[i % 8],
        avatar: avatars[i % 8],
        cover: parseInt(i / 4, 10) % 2 === 0 ? covers[i % 4] : covers[3 - i % 4],
        status: ['active', 'exception', 'normal'][i % 3],
        percent: Math.ceil(Math.random() * 50) + 50,
        logo: avatars[i % 8],
        href: 'https://ant.design',
        updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
        createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
        subDescription: desc[i % 5],
        description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
        activeUser: Math.ceil(Math.random() * 100000) + 100000,
        newUser: Math.ceil(Math.random() * 1000) + 1000,
        star: Math.ceil(Math.random() * 100) + 100,
        like: Math.ceil(Math.random() * 100) + 100,
        message: Math.ceil(Math.random() * 10) + 10,
        content: '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
        members: [{
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
          name: '曲丽丽',
          id: 'member1'
        }, {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
          name: '王昭君',
          id: 'member2'
        }, {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
          name: '董娜娜',
          id: 'member3'
        }]
      });
    }

    return list;
  }

  let sourceData;

  function getFakeList(req, res) {
    const params = req.query;
    const count = params.count * 1 || 20;
    const result = fakeList(count);
    sourceData = result;
    return res.json(result);
  }

  function postFakeList(req, res) {
    const {
      /* url = '', */
      body
    } = req; // const params = getUrlParams(url);

    const {
      method,
      id
    } = body; // const count = (params.count * 1) || 20;

    let result = sourceData;

    switch (method) {
      case 'delete':
        result = result.filter(item => item.id !== id);
        break;

      case 'update':
        result.forEach((item, i) => {
          if (item.id === id) {
            result[i] = Object.assign(item, body);
          }
        });
        break;

      case 'post':
        result.unshift({
          body,
          id: `fake-list-${result.length}`,
          createdAt: new Date().getTime()
        });
        break;

      default:
        break;
    }

    return res.json(result);
  }

  const getNotice = [{
    id: 'xxx1',
    title: titles[0],
    logo: avatars[0],
    description: '那是一种内在的东西，他们到达不了，也无法触及的',
    updatedAt: new Date(),
    member: '科学搬砖组',
    href: '',
    memberLink: ''
  }, {
    id: 'xxx2',
    title: titles[1],
    logo: avatars[1],
    description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
    updatedAt: new Date('2017-07-24'),
    member: '全组都是吴彦祖',
    href: '',
    memberLink: ''
  }, {
    id: 'xxx3',
    title: titles[2],
    logo: avatars[2],
    description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
    updatedAt: new Date(),
    member: '中二少女团',
    href: '',
    memberLink: ''
  }, {
    id: 'xxx4',
    title: titles[3],
    logo: avatars[3],
    description: '那时候我只会想自己想要什么，从不想自己拥有什么',
    updatedAt: new Date('2017-07-23'),
    member: '程序员日常',
    href: '',
    memberLink: ''
  }, {
    id: 'xxx5',
    title: titles[4],
    logo: avatars[4],
    description: '凛冬将至',
    updatedAt: new Date('2017-07-23'),
    member: '高逼格设计天团',
    href: '',
    memberLink: ''
  }, {
    id: 'xxx6',
    title: titles[5],
    logo: avatars[5],
    description: '生命就像一盒巧克力，结果往往出人意料',
    updatedAt: new Date('2017-07-23'),
    member: '骗你来学计算机',
    href: '',
    memberLink: ''
  }];
  const getActivities = [{
    id: 'trend-1',
    updatedAt: new Date(),
    user: {
      name: '曲丽丽',
      avatar: avatars2[0]
    },
    group: {
      name: '高逼格设计天团',
      link: 'http://github.com/'
    },
    project: {
      name: '六月迭代',
      link: 'http://github.com/'
    },
    template: '在 @{group} 新建项目 @{project}'
  }, {
    id: 'trend-2',
    updatedAt: new Date(),
    user: {
      name: '付小小',
      avatar: avatars2[1]
    },
    group: {
      name: '高逼格设计天团',
      link: 'http://github.com/'
    },
    project: {
      name: '六月迭代',
      link: 'http://github.com/'
    },
    template: '在 @{group} 新建项目 @{project}'
  }, {
    id: 'trend-3',
    updatedAt: new Date(),
    user: {
      name: '林东东',
      avatar: avatars2[2]
    },
    group: {
      name: '中二少女团',
      link: 'http://github.com/'
    },
    project: {
      name: '六月迭代',
      link: 'http://github.com/'
    },
    template: '在 @{group} 新建项目 @{project}'
  }, {
    id: 'trend-4',
    updatedAt: new Date(),
    user: {
      name: '周星星',
      avatar: avatars2[4]
    },
    project: {
      name: '5 月日常迭代',
      link: 'http://github.com/'
    },
    template: '将 @{project} 更新至已发布状态'
  }, {
    id: 'trend-5',
    updatedAt: new Date(),
    user: {
      name: '朱偏右',
      avatar: avatars2[3]
    },
    project: {
      name: '工程效能',
      link: 'http://github.com/'
    },
    comment: {
      name: '留言',
      link: 'http://github.com/'
    },
    template: '在 @{project} 发布了 @{comment}'
  }, {
    id: 'trend-6',
    updatedAt: new Date(),
    user: {
      name: '乐哥',
      avatar: avatars2[5]
    },
    group: {
      name: '程序员日常',
      link: 'http://github.com/'
    },
    project: {
      name: '品牌迭代',
      link: 'http://github.com/'
    },
    template: '在 @{group} 新建项目 @{project}'
  }];

  function getFakeCaptcha(req, res) {
    return res.json('captcha-xxx');
  }

  var api = {
    'GET /api/project/notice': getNotice,
    'GET /api/activities': getActivities,
    'POST /api/forms': (req, res) => {
      res.send({
        message: 'Ok'
      });
    },
    'GET /api/tags': mockjs.mock({
      'list|100': [{
        name: '@city',
        'value|1-100': 150,
        'type|0-2': 1
      }]
    }),
    'GET /api/fake_list': getFakeList,
    'POST /api/fake_list': postFakeList,
    'GET /api/captcha': getFakeCaptcha
  };

  const visitData = [];
  const beginDay = new Date().getTime();
  const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];

  for (let i = 0; i < fakeY.length; i += 1) {
    visitData.push({
      x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
      y: fakeY[i]
    });
  }

  const visitData2 = [];
  const fakeY2 = [1, 6, 4, 8, 3, 7, 2];

  for (let i = 0; i < fakeY2.length; i += 1) {
    visitData2.push({
      x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
      y: fakeY2[i]
    });
  }

  const salesData = [];

  for (let i = 0; i < 12; i += 1) {
    salesData.push({
      x: `${i + 1}月`,
      y: Math.floor(Math.random() * 1000) + 200
    });
  }

  const searchData = [];

  for (let i = 0; i < 50; i += 1) {
    searchData.push({
      index: i + 1,
      keyword: `搜索关键词-${i}`,
      count: Math.floor(Math.random() * 1000),
      range: Math.floor(Math.random() * 100),
      status: Math.floor(Math.random() * 10 % 2)
    });
  }

  const salesTypeData = [{
    x: '家用电器',
    y: 4544
  }, {
    x: '食用酒水',
    y: 3321
  }, {
    x: '个护健康',
    y: 3113
  }, {
    x: '服饰箱包',
    y: 2341
  }, {
    x: '母婴产品',
    y: 1231
  }, {
    x: '其他',
    y: 1231
  }];
  const salesTypeDataOnline = [{
    x: '家用电器',
    y: 244
  }, {
    x: '食用酒水',
    y: 321
  }, {
    x: '个护健康',
    y: 311
  }, {
    x: '服饰箱包',
    y: 41
  }, {
    x: '母婴产品',
    y: 121
  }, {
    x: '其他',
    y: 111
  }];
  const salesTypeDataOffline = [{
    x: '家用电器',
    y: 99
  }, {
    x: '食用酒水',
    y: 188
  }, {
    x: '个护健康',
    y: 344
  }, {
    x: '服饰箱包',
    y: 255
  }, {
    x: '其他',
    y: 65
  }];
  const offlineData = [];

  for (let i = 0; i < 10; i += 1) {
    offlineData.push({
      name: `Stores ${i}`,
      cvr: Math.ceil(Math.random() * 9) / 10
    });
  }

  const offlineChartData = [];

  for (let i = 0; i < 20; i += 1) {
    offlineChartData.push({
      x: new Date().getTime() + 1000 * 60 * 30 * i,
      y1: Math.floor(Math.random() * 100) + 10,
      y2: Math.floor(Math.random() * 100) + 10
    });
  }

  const radarOriginData = [{
    name: '个人',
    ref: 10,
    koubei: 8,
    output: 4,
    contribute: 5,
    hot: 7
  }, {
    name: '团队',
    ref: 3,
    koubei: 9,
    output: 6,
    contribute: 3,
    hot: 1
  }, {
    name: '部门',
    ref: 4,
    koubei: 1,
    output: 6,
    contribute: 5,
    hot: 7
  }];
  const radarData = [];
  const radarTitleMap = {
    ref: '引用',
    koubei: '口碑',
    output: '产量',
    contribute: '贡献',
    hot: '热度'
  };
  radarOriginData.forEach(item => {
    Object.keys(item).forEach(key => {
      if (key !== 'name') {
        radarData.push({
          name: item.name,
          label: radarTitleMap[key],
          value: item[key]
        });
      }
    });
  });
  const getFakeChartData = {
    visitData,
    visitData2,
    salesData,
    searchData,
    offlineData,
    offlineChartData,
    salesTypeData,
    salesTypeDataOnline,
    salesTypeDataOffline,
    radarData
  };
  var chart = {
    'GET /api/fake_chart_data': getFakeChartData
  };

  var city = {
    "110000": [
    {
      province: "北京市",
      name: "市辖区",
      id: "110100"
    }
  ],
    "120000": [
    {
      province: "天津市",
      name: "市辖区",
      id: "120100"
    }
  ],
    "130000": [
    {
      province: "河北省",
      name: "石家庄市",
      id: "130100"
    },
    {
      province: "河北省",
      name: "唐山市",
      id: "130200"
    },
    {
      province: "河北省",
      name: "秦皇岛市",
      id: "130300"
    },
    {
      province: "河北省",
      name: "邯郸市",
      id: "130400"
    },
    {
      province: "河北省",
      name: "邢台市",
      id: "130500"
    },
    {
      province: "河北省",
      name: "保定市",
      id: "130600"
    },
    {
      province: "河北省",
      name: "张家口市",
      id: "130700"
    },
    {
      province: "河北省",
      name: "承德市",
      id: "130800"
    },
    {
      province: "河北省",
      name: "沧州市",
      id: "130900"
    },
    {
      province: "河北省",
      name: "廊坊市",
      id: "131000"
    },
    {
      province: "河北省",
      name: "衡水市",
      id: "131100"
    },
    {
      province: "河北省",
      name: "省直辖县级行政区划",
      id: "139000"
    }
  ],
    "140000": [
    {
      province: "山西省",
      name: "太原市",
      id: "140100"
    },
    {
      province: "山西省",
      name: "大同市",
      id: "140200"
    },
    {
      province: "山西省",
      name: "阳泉市",
      id: "140300"
    },
    {
      province: "山西省",
      name: "长治市",
      id: "140400"
    },
    {
      province: "山西省",
      name: "晋城市",
      id: "140500"
    },
    {
      province: "山西省",
      name: "朔州市",
      id: "140600"
    },
    {
      province: "山西省",
      name: "晋中市",
      id: "140700"
    },
    {
      province: "山西省",
      name: "运城市",
      id: "140800"
    },
    {
      province: "山西省",
      name: "忻州市",
      id: "140900"
    },
    {
      province: "山西省",
      name: "临汾市",
      id: "141000"
    },
    {
      province: "山西省",
      name: "吕梁市",
      id: "141100"
    }
  ],
    "150000": [
    {
      province: "内蒙古自治区",
      name: "呼和浩特市",
      id: "150100"
    },
    {
      province: "内蒙古自治区",
      name: "包头市",
      id: "150200"
    },
    {
      province: "内蒙古自治区",
      name: "乌海市",
      id: "150300"
    },
    {
      province: "内蒙古自治区",
      name: "赤峰市",
      id: "150400"
    },
    {
      province: "内蒙古自治区",
      name: "通辽市",
      id: "150500"
    },
    {
      province: "内蒙古自治区",
      name: "鄂尔多斯市",
      id: "150600"
    },
    {
      province: "内蒙古自治区",
      name: "呼伦贝尔市",
      id: "150700"
    },
    {
      province: "内蒙古自治区",
      name: "巴彦淖尔市",
      id: "150800"
    },
    {
      province: "内蒙古自治区",
      name: "乌兰察布市",
      id: "150900"
    },
    {
      province: "内蒙古自治区",
      name: "兴安盟",
      id: "152200"
    },
    {
      province: "内蒙古自治区",
      name: "锡林郭勒盟",
      id: "152500"
    },
    {
      province: "内蒙古自治区",
      name: "阿拉善盟",
      id: "152900"
    }
  ],
    "210000": [
    {
      province: "辽宁省",
      name: "沈阳市",
      id: "210100"
    },
    {
      province: "辽宁省",
      name: "大连市",
      id: "210200"
    },
    {
      province: "辽宁省",
      name: "鞍山市",
      id: "210300"
    },
    {
      province: "辽宁省",
      name: "抚顺市",
      id: "210400"
    },
    {
      province: "辽宁省",
      name: "本溪市",
      id: "210500"
    },
    {
      province: "辽宁省",
      name: "丹东市",
      id: "210600"
    },
    {
      province: "辽宁省",
      name: "锦州市",
      id: "210700"
    },
    {
      province: "辽宁省",
      name: "营口市",
      id: "210800"
    },
    {
      province: "辽宁省",
      name: "阜新市",
      id: "210900"
    },
    {
      province: "辽宁省",
      name: "辽阳市",
      id: "211000"
    },
    {
      province: "辽宁省",
      name: "盘锦市",
      id: "211100"
    },
    {
      province: "辽宁省",
      name: "铁岭市",
      id: "211200"
    },
    {
      province: "辽宁省",
      name: "朝阳市",
      id: "211300"
    },
    {
      province: "辽宁省",
      name: "葫芦岛市",
      id: "211400"
    }
  ],
    "220000": [
    {
      province: "吉林省",
      name: "长春市",
      id: "220100"
    },
    {
      province: "吉林省",
      name: "吉林市",
      id: "220200"
    },
    {
      province: "吉林省",
      name: "四平市",
      id: "220300"
    },
    {
      province: "吉林省",
      name: "辽源市",
      id: "220400"
    },
    {
      province: "吉林省",
      name: "通化市",
      id: "220500"
    },
    {
      province: "吉林省",
      name: "白山市",
      id: "220600"
    },
    {
      province: "吉林省",
      name: "松原市",
      id: "220700"
    },
    {
      province: "吉林省",
      name: "白城市",
      id: "220800"
    },
    {
      province: "吉林省",
      name: "延边朝鲜族自治州",
      id: "222400"
    }
  ],
    "230000": [
    {
      province: "黑龙江省",
      name: "哈尔滨市",
      id: "230100"
    },
    {
      province: "黑龙江省",
      name: "齐齐哈尔市",
      id: "230200"
    },
    {
      province: "黑龙江省",
      name: "鸡西市",
      id: "230300"
    },
    {
      province: "黑龙江省",
      name: "鹤岗市",
      id: "230400"
    },
    {
      province: "黑龙江省",
      name: "双鸭山市",
      id: "230500"
    },
    {
      province: "黑龙江省",
      name: "大庆市",
      id: "230600"
    },
    {
      province: "黑龙江省",
      name: "伊春市",
      id: "230700"
    },
    {
      province: "黑龙江省",
      name: "佳木斯市",
      id: "230800"
    },
    {
      province: "黑龙江省",
      name: "七台河市",
      id: "230900"
    },
    {
      province: "黑龙江省",
      name: "牡丹江市",
      id: "231000"
    },
    {
      province: "黑龙江省",
      name: "黑河市",
      id: "231100"
    },
    {
      province: "黑龙江省",
      name: "绥化市",
      id: "231200"
    },
    {
      province: "黑龙江省",
      name: "大兴安岭地区",
      id: "232700"
    }
  ],
    "310000": [
    {
      province: "上海市",
      name: "市辖区",
      id: "310100"
    }
  ],
    "320000": [
    {
      province: "江苏省",
      name: "南京市",
      id: "320100"
    },
    {
      province: "江苏省",
      name: "无锡市",
      id: "320200"
    },
    {
      province: "江苏省",
      name: "徐州市",
      id: "320300"
    },
    {
      province: "江苏省",
      name: "常州市",
      id: "320400"
    },
    {
      province: "江苏省",
      name: "苏州市",
      id: "320500"
    },
    {
      province: "江苏省",
      name: "南通市",
      id: "320600"
    },
    {
      province: "江苏省",
      name: "连云港市",
      id: "320700"
    },
    {
      province: "江苏省",
      name: "淮安市",
      id: "320800"
    },
    {
      province: "江苏省",
      name: "盐城市",
      id: "320900"
    },
    {
      province: "江苏省",
      name: "扬州市",
      id: "321000"
    },
    {
      province: "江苏省",
      name: "镇江市",
      id: "321100"
    },
    {
      province: "江苏省",
      name: "泰州市",
      id: "321200"
    },
    {
      province: "江苏省",
      name: "宿迁市",
      id: "321300"
    }
  ],
    "330000": [
    {
      province: "浙江省",
      name: "杭州市",
      id: "330100"
    },
    {
      province: "浙江省",
      name: "宁波市",
      id: "330200"
    },
    {
      province: "浙江省",
      name: "温州市",
      id: "330300"
    },
    {
      province: "浙江省",
      name: "嘉兴市",
      id: "330400"
    },
    {
      province: "浙江省",
      name: "湖州市",
      id: "330500"
    },
    {
      province: "浙江省",
      name: "绍兴市",
      id: "330600"
    },
    {
      province: "浙江省",
      name: "金华市",
      id: "330700"
    },
    {
      province: "浙江省",
      name: "衢州市",
      id: "330800"
    },
    {
      province: "浙江省",
      name: "舟山市",
      id: "330900"
    },
    {
      province: "浙江省",
      name: "台州市",
      id: "331000"
    },
    {
      province: "浙江省",
      name: "丽水市",
      id: "331100"
    }
  ],
    "340000": [
    {
      province: "安徽省",
      name: "合肥市",
      id: "340100"
    },
    {
      province: "安徽省",
      name: "芜湖市",
      id: "340200"
    },
    {
      province: "安徽省",
      name: "蚌埠市",
      id: "340300"
    },
    {
      province: "安徽省",
      name: "淮南市",
      id: "340400"
    },
    {
      province: "安徽省",
      name: "马鞍山市",
      id: "340500"
    },
    {
      province: "安徽省",
      name: "淮北市",
      id: "340600"
    },
    {
      province: "安徽省",
      name: "铜陵市",
      id: "340700"
    },
    {
      province: "安徽省",
      name: "安庆市",
      id: "340800"
    },
    {
      province: "安徽省",
      name: "黄山市",
      id: "341000"
    },
    {
      province: "安徽省",
      name: "滁州市",
      id: "341100"
    },
    {
      province: "安徽省",
      name: "阜阳市",
      id: "341200"
    },
    {
      province: "安徽省",
      name: "宿州市",
      id: "341300"
    },
    {
      province: "安徽省",
      name: "六安市",
      id: "341500"
    },
    {
      province: "安徽省",
      name: "亳州市",
      id: "341600"
    },
    {
      province: "安徽省",
      name: "池州市",
      id: "341700"
    },
    {
      province: "安徽省",
      name: "宣城市",
      id: "341800"
    }
  ],
    "350000": [
    {
      province: "福建省",
      name: "福州市",
      id: "350100"
    },
    {
      province: "福建省",
      name: "厦门市",
      id: "350200"
    },
    {
      province: "福建省",
      name: "莆田市",
      id: "350300"
    },
    {
      province: "福建省",
      name: "三明市",
      id: "350400"
    },
    {
      province: "福建省",
      name: "泉州市",
      id: "350500"
    },
    {
      province: "福建省",
      name: "漳州市",
      id: "350600"
    },
    {
      province: "福建省",
      name: "南平市",
      id: "350700"
    },
    {
      province: "福建省",
      name: "龙岩市",
      id: "350800"
    },
    {
      province: "福建省",
      name: "宁德市",
      id: "350900"
    }
  ],
    "360000": [
    {
      province: "江西省",
      name: "南昌市",
      id: "360100"
    },
    {
      province: "江西省",
      name: "景德镇市",
      id: "360200"
    },
    {
      province: "江西省",
      name: "萍乡市",
      id: "360300"
    },
    {
      province: "江西省",
      name: "九江市",
      id: "360400"
    },
    {
      province: "江西省",
      name: "新余市",
      id: "360500"
    },
    {
      province: "江西省",
      name: "鹰潭市",
      id: "360600"
    },
    {
      province: "江西省",
      name: "赣州市",
      id: "360700"
    },
    {
      province: "江西省",
      name: "吉安市",
      id: "360800"
    },
    {
      province: "江西省",
      name: "宜春市",
      id: "360900"
    },
    {
      province: "江西省",
      name: "抚州市",
      id: "361000"
    },
    {
      province: "江西省",
      name: "上饶市",
      id: "361100"
    }
  ],
    "370000": [
    {
      province: "山东省",
      name: "济南市",
      id: "370100"
    },
    {
      province: "山东省",
      name: "青岛市",
      id: "370200"
    },
    {
      province: "山东省",
      name: "淄博市",
      id: "370300"
    },
    {
      province: "山东省",
      name: "枣庄市",
      id: "370400"
    },
    {
      province: "山东省",
      name: "东营市",
      id: "370500"
    },
    {
      province: "山东省",
      name: "烟台市",
      id: "370600"
    },
    {
      province: "山东省",
      name: "潍坊市",
      id: "370700"
    },
    {
      province: "山东省",
      name: "济宁市",
      id: "370800"
    },
    {
      province: "山东省",
      name: "泰安市",
      id: "370900"
    },
    {
      province: "山东省",
      name: "威海市",
      id: "371000"
    },
    {
      province: "山东省",
      name: "日照市",
      id: "371100"
    },
    {
      province: "山东省",
      name: "莱芜市",
      id: "371200"
    },
    {
      province: "山东省",
      name: "临沂市",
      id: "371300"
    },
    {
      province: "山东省",
      name: "德州市",
      id: "371400"
    },
    {
      province: "山东省",
      name: "聊城市",
      id: "371500"
    },
    {
      province: "山东省",
      name: "滨州市",
      id: "371600"
    },
    {
      province: "山东省",
      name: "菏泽市",
      id: "371700"
    }
  ],
    "410000": [
    {
      province: "河南省",
      name: "郑州市",
      id: "410100"
    },
    {
      province: "河南省",
      name: "开封市",
      id: "410200"
    },
    {
      province: "河南省",
      name: "洛阳市",
      id: "410300"
    },
    {
      province: "河南省",
      name: "平顶山市",
      id: "410400"
    },
    {
      province: "河南省",
      name: "安阳市",
      id: "410500"
    },
    {
      province: "河南省",
      name: "鹤壁市",
      id: "410600"
    },
    {
      province: "河南省",
      name: "新乡市",
      id: "410700"
    },
    {
      province: "河南省",
      name: "焦作市",
      id: "410800"
    },
    {
      province: "河南省",
      name: "濮阳市",
      id: "410900"
    },
    {
      province: "河南省",
      name: "许昌市",
      id: "411000"
    },
    {
      province: "河南省",
      name: "漯河市",
      id: "411100"
    },
    {
      province: "河南省",
      name: "三门峡市",
      id: "411200"
    },
    {
      province: "河南省",
      name: "南阳市",
      id: "411300"
    },
    {
      province: "河南省",
      name: "商丘市",
      id: "411400"
    },
    {
      province: "河南省",
      name: "信阳市",
      id: "411500"
    },
    {
      province: "河南省",
      name: "周口市",
      id: "411600"
    },
    {
      province: "河南省",
      name: "驻马店市",
      id: "411700"
    },
    {
      province: "河南省",
      name: "省直辖县级行政区划",
      id: "419000"
    }
  ],
    "420000": [
    {
      province: "湖北省",
      name: "武汉市",
      id: "420100"
    },
    {
      province: "湖北省",
      name: "黄石市",
      id: "420200"
    },
    {
      province: "湖北省",
      name: "十堰市",
      id: "420300"
    },
    {
      province: "湖北省",
      name: "宜昌市",
      id: "420500"
    },
    {
      province: "湖北省",
      name: "襄阳市",
      id: "420600"
    },
    {
      province: "湖北省",
      name: "鄂州市",
      id: "420700"
    },
    {
      province: "湖北省",
      name: "荆门市",
      id: "420800"
    },
    {
      province: "湖北省",
      name: "孝感市",
      id: "420900"
    },
    {
      province: "湖北省",
      name: "荆州市",
      id: "421000"
    },
    {
      province: "湖北省",
      name: "黄冈市",
      id: "421100"
    },
    {
      province: "湖北省",
      name: "咸宁市",
      id: "421200"
    },
    {
      province: "湖北省",
      name: "随州市",
      id: "421300"
    },
    {
      province: "湖北省",
      name: "恩施土家族苗族自治州",
      id: "422800"
    },
    {
      province: "湖北省",
      name: "省直辖县级行政区划",
      id: "429000"
    }
  ],
    "430000": [
    {
      province: "湖南省",
      name: "长沙市",
      id: "430100"
    },
    {
      province: "湖南省",
      name: "株洲市",
      id: "430200"
    },
    {
      province: "湖南省",
      name: "湘潭市",
      id: "430300"
    },
    {
      province: "湖南省",
      name: "衡阳市",
      id: "430400"
    },
    {
      province: "湖南省",
      name: "邵阳市",
      id: "430500"
    },
    {
      province: "湖南省",
      name: "岳阳市",
      id: "430600"
    },
    {
      province: "湖南省",
      name: "常德市",
      id: "430700"
    },
    {
      province: "湖南省",
      name: "张家界市",
      id: "430800"
    },
    {
      province: "湖南省",
      name: "益阳市",
      id: "430900"
    },
    {
      province: "湖南省",
      name: "郴州市",
      id: "431000"
    },
    {
      province: "湖南省",
      name: "永州市",
      id: "431100"
    },
    {
      province: "湖南省",
      name: "怀化市",
      id: "431200"
    },
    {
      province: "湖南省",
      name: "娄底市",
      id: "431300"
    },
    {
      province: "湖南省",
      name: "湘西土家族苗族自治州",
      id: "433100"
    }
  ],
    "440000": [
    {
      province: "广东省",
      name: "广州市",
      id: "440100"
    },
    {
      province: "广东省",
      name: "韶关市",
      id: "440200"
    },
    {
      province: "广东省",
      name: "深圳市",
      id: "440300"
    },
    {
      province: "广东省",
      name: "珠海市",
      id: "440400"
    },
    {
      province: "广东省",
      name: "汕头市",
      id: "440500"
    },
    {
      province: "广东省",
      name: "佛山市",
      id: "440600"
    },
    {
      province: "广东省",
      name: "江门市",
      id: "440700"
    },
    {
      province: "广东省",
      name: "湛江市",
      id: "440800"
    },
    {
      province: "广东省",
      name: "茂名市",
      id: "440900"
    },
    {
      province: "广东省",
      name: "肇庆市",
      id: "441200"
    },
    {
      province: "广东省",
      name: "惠州市",
      id: "441300"
    },
    {
      province: "广东省",
      name: "梅州市",
      id: "441400"
    },
    {
      province: "广东省",
      name: "汕尾市",
      id: "441500"
    },
    {
      province: "广东省",
      name: "河源市",
      id: "441600"
    },
    {
      province: "广东省",
      name: "阳江市",
      id: "441700"
    },
    {
      province: "广东省",
      name: "清远市",
      id: "441800"
    },
    {
      province: "广东省",
      name: "东莞市",
      id: "441900"
    },
    {
      province: "广东省",
      name: "中山市",
      id: "442000"
    },
    {
      province: "广东省",
      name: "潮州市",
      id: "445100"
    },
    {
      province: "广东省",
      name: "揭阳市",
      id: "445200"
    },
    {
      province: "广东省",
      name: "云浮市",
      id: "445300"
    }
  ],
    "450000": [
    {
      province: "广西壮族自治区",
      name: "南宁市",
      id: "450100"
    },
    {
      province: "广西壮族自治区",
      name: "柳州市",
      id: "450200"
    },
    {
      province: "广西壮族自治区",
      name: "桂林市",
      id: "450300"
    },
    {
      province: "广西壮族自治区",
      name: "梧州市",
      id: "450400"
    },
    {
      province: "广西壮族自治区",
      name: "北海市",
      id: "450500"
    },
    {
      province: "广西壮族自治区",
      name: "防城港市",
      id: "450600"
    },
    {
      province: "广西壮族自治区",
      name: "钦州市",
      id: "450700"
    },
    {
      province: "广西壮族自治区",
      name: "贵港市",
      id: "450800"
    },
    {
      province: "广西壮族自治区",
      name: "玉林市",
      id: "450900"
    },
    {
      province: "广西壮族自治区",
      name: "百色市",
      id: "451000"
    },
    {
      province: "广西壮族自治区",
      name: "贺州市",
      id: "451100"
    },
    {
      province: "广西壮族自治区",
      name: "河池市",
      id: "451200"
    },
    {
      province: "广西壮族自治区",
      name: "来宾市",
      id: "451300"
    },
    {
      province: "广西壮族自治区",
      name: "崇左市",
      id: "451400"
    }
  ],
    "460000": [
    {
      province: "海南省",
      name: "海口市",
      id: "460100"
    },
    {
      province: "海南省",
      name: "三亚市",
      id: "460200"
    },
    {
      province: "海南省",
      name: "三沙市",
      id: "460300"
    },
    {
      province: "海南省",
      name: "儋州市",
      id: "460400"
    },
    {
      province: "海南省",
      name: "省直辖县级行政区划",
      id: "469000"
    }
  ],
    "500000": [
    {
      province: "重庆市",
      name: "市辖区",
      id: "500100"
    },
    {
      province: "重庆市",
      name: "县",
      id: "500200"
    }
  ],
    "510000": [
    {
      province: "四川省",
      name: "成都市",
      id: "510100"
    },
    {
      province: "四川省",
      name: "自贡市",
      id: "510300"
    },
    {
      province: "四川省",
      name: "攀枝花市",
      id: "510400"
    },
    {
      province: "四川省",
      name: "泸州市",
      id: "510500"
    },
    {
      province: "四川省",
      name: "德阳市",
      id: "510600"
    },
    {
      province: "四川省",
      name: "绵阳市",
      id: "510700"
    },
    {
      province: "四川省",
      name: "广元市",
      id: "510800"
    },
    {
      province: "四川省",
      name: "遂宁市",
      id: "510900"
    },
    {
      province: "四川省",
      name: "内江市",
      id: "511000"
    },
    {
      province: "四川省",
      name: "乐山市",
      id: "511100"
    },
    {
      province: "四川省",
      name: "南充市",
      id: "511300"
    },
    {
      province: "四川省",
      name: "眉山市",
      id: "511400"
    },
    {
      province: "四川省",
      name: "宜宾市",
      id: "511500"
    },
    {
      province: "四川省",
      name: "广安市",
      id: "511600"
    },
    {
      province: "四川省",
      name: "达州市",
      id: "511700"
    },
    {
      province: "四川省",
      name: "雅安市",
      id: "511800"
    },
    {
      province: "四川省",
      name: "巴中市",
      id: "511900"
    },
    {
      province: "四川省",
      name: "资阳市",
      id: "512000"
    },
    {
      province: "四川省",
      name: "阿坝藏族羌族自治州",
      id: "513200"
    },
    {
      province: "四川省",
      name: "甘孜藏族自治州",
      id: "513300"
    },
    {
      province: "四川省",
      name: "凉山彝族自治州",
      id: "513400"
    }
  ],
    "520000": [
    {
      province: "贵州省",
      name: "贵阳市",
      id: "520100"
    },
    {
      province: "贵州省",
      name: "六盘水市",
      id: "520200"
    },
    {
      province: "贵州省",
      name: "遵义市",
      id: "520300"
    },
    {
      province: "贵州省",
      name: "安顺市",
      id: "520400"
    },
    {
      province: "贵州省",
      name: "毕节市",
      id: "520500"
    },
    {
      province: "贵州省",
      name: "铜仁市",
      id: "520600"
    },
    {
      province: "贵州省",
      name: "黔西南布依族苗族自治州",
      id: "522300"
    },
    {
      province: "贵州省",
      name: "黔东南苗族侗族自治州",
      id: "522600"
    },
    {
      province: "贵州省",
      name: "黔南布依族苗族自治州",
      id: "522700"
    }
  ],
    "530000": [
    {
      province: "云南省",
      name: "昆明市",
      id: "530100"
    },
    {
      province: "云南省",
      name: "曲靖市",
      id: "530300"
    },
    {
      province: "云南省",
      name: "玉溪市",
      id: "530400"
    },
    {
      province: "云南省",
      name: "保山市",
      id: "530500"
    },
    {
      province: "云南省",
      name: "昭通市",
      id: "530600"
    },
    {
      province: "云南省",
      name: "丽江市",
      id: "530700"
    },
    {
      province: "云南省",
      name: "普洱市",
      id: "530800"
    },
    {
      province: "云南省",
      name: "临沧市",
      id: "530900"
    },
    {
      province: "云南省",
      name: "楚雄彝族自治州",
      id: "532300"
    },
    {
      province: "云南省",
      name: "红河哈尼族彝族自治州",
      id: "532500"
    },
    {
      province: "云南省",
      name: "文山壮族苗族自治州",
      id: "532600"
    },
    {
      province: "云南省",
      name: "西双版纳傣族自治州",
      id: "532800"
    },
    {
      province: "云南省",
      name: "大理白族自治州",
      id: "532900"
    },
    {
      province: "云南省",
      name: "德宏傣族景颇族自治州",
      id: "533100"
    },
    {
      province: "云南省",
      name: "怒江傈僳族自治州",
      id: "533300"
    },
    {
      province: "云南省",
      name: "迪庆藏族自治州",
      id: "533400"
    }
  ],
    "540000": [
    {
      province: "西藏自治区",
      name: "拉萨市",
      id: "540100"
    },
    {
      province: "西藏自治区",
      name: "日喀则市",
      id: "540200"
    },
    {
      province: "西藏自治区",
      name: "昌都市",
      id: "540300"
    },
    {
      province: "西藏自治区",
      name: "林芝市",
      id: "540400"
    },
    {
      province: "西藏自治区",
      name: "山南市",
      id: "540500"
    },
    {
      province: "西藏自治区",
      name: "那曲地区",
      id: "542400"
    },
    {
      province: "西藏自治区",
      name: "阿里地区",
      id: "542500"
    }
  ],
    "610000": [
    {
      province: "陕西省",
      name: "西安市",
      id: "610100"
    },
    {
      province: "陕西省",
      name: "铜川市",
      id: "610200"
    },
    {
      province: "陕西省",
      name: "宝鸡市",
      id: "610300"
    },
    {
      province: "陕西省",
      name: "咸阳市",
      id: "610400"
    },
    {
      province: "陕西省",
      name: "渭南市",
      id: "610500"
    },
    {
      province: "陕西省",
      name: "延安市",
      id: "610600"
    },
    {
      province: "陕西省",
      name: "汉中市",
      id: "610700"
    },
    {
      province: "陕西省",
      name: "榆林市",
      id: "610800"
    },
    {
      province: "陕西省",
      name: "安康市",
      id: "610900"
    },
    {
      province: "陕西省",
      name: "商洛市",
      id: "611000"
    }
  ],
    "620000": [
    {
      province: "甘肃省",
      name: "兰州市",
      id: "620100"
    },
    {
      province: "甘肃省",
      name: "嘉峪关市",
      id: "620200"
    },
    {
      province: "甘肃省",
      name: "金昌市",
      id: "620300"
    },
    {
      province: "甘肃省",
      name: "白银市",
      id: "620400"
    },
    {
      province: "甘肃省",
      name: "天水市",
      id: "620500"
    },
    {
      province: "甘肃省",
      name: "武威市",
      id: "620600"
    },
    {
      province: "甘肃省",
      name: "张掖市",
      id: "620700"
    },
    {
      province: "甘肃省",
      name: "平凉市",
      id: "620800"
    },
    {
      province: "甘肃省",
      name: "酒泉市",
      id: "620900"
    },
    {
      province: "甘肃省",
      name: "庆阳市",
      id: "621000"
    },
    {
      province: "甘肃省",
      name: "定西市",
      id: "621100"
    },
    {
      province: "甘肃省",
      name: "陇南市",
      id: "621200"
    },
    {
      province: "甘肃省",
      name: "临夏回族自治州",
      id: "622900"
    },
    {
      province: "甘肃省",
      name: "甘南藏族自治州",
      id: "623000"
    }
  ],
    "630000": [
    {
      province: "青海省",
      name: "西宁市",
      id: "630100"
    },
    {
      province: "青海省",
      name: "海东市",
      id: "630200"
    },
    {
      province: "青海省",
      name: "海北藏族自治州",
      id: "632200"
    },
    {
      province: "青海省",
      name: "黄南藏族自治州",
      id: "632300"
    },
    {
      province: "青海省",
      name: "海南藏族自治州",
      id: "632500"
    },
    {
      province: "青海省",
      name: "果洛藏族自治州",
      id: "632600"
    },
    {
      province: "青海省",
      name: "玉树藏族自治州",
      id: "632700"
    },
    {
      province: "青海省",
      name: "海西蒙古族藏族自治州",
      id: "632800"
    }
  ],
    "640000": [
    {
      province: "宁夏回族自治区",
      name: "银川市",
      id: "640100"
    },
    {
      province: "宁夏回族自治区",
      name: "石嘴山市",
      id: "640200"
    },
    {
      province: "宁夏回族自治区",
      name: "吴忠市",
      id: "640300"
    },
    {
      province: "宁夏回族自治区",
      name: "固原市",
      id: "640400"
    },
    {
      province: "宁夏回族自治区",
      name: "中卫市",
      id: "640500"
    }
  ],
    "650000": [
    {
      province: "新疆维吾尔自治区",
      name: "乌鲁木齐市",
      id: "650100"
    },
    {
      province: "新疆维吾尔自治区",
      name: "克拉玛依市",
      id: "650200"
    },
    {
      province: "新疆维吾尔自治区",
      name: "吐鲁番市",
      id: "650400"
    },
    {
      province: "新疆维吾尔自治区",
      name: "哈密市",
      id: "650500"
    },
    {
      province: "新疆维吾尔自治区",
      name: "昌吉回族自治州",
      id: "652300"
    },
    {
      province: "新疆维吾尔自治区",
      name: "博尔塔拉蒙古自治州",
      id: "652700"
    },
    {
      province: "新疆维吾尔自治区",
      name: "巴音郭楞蒙古自治州",
      id: "652800"
    },
    {
      province: "新疆维吾尔自治区",
      name: "阿克苏地区",
      id: "652900"
    },
    {
      province: "新疆维吾尔自治区",
      name: "克孜勒苏柯尔克孜自治州",
      id: "653000"
    },
    {
      province: "新疆维吾尔自治区",
      name: "喀什地区",
      id: "653100"
    },
    {
      province: "新疆维吾尔自治区",
      name: "和田地区",
      id: "653200"
    },
    {
      province: "新疆维吾尔自治区",
      name: "伊犁哈萨克自治州",
      id: "654000"
    },
    {
      province: "新疆维吾尔自治区",
      name: "塔城地区",
      id: "654200"
    },
    {
      province: "新疆维吾尔自治区",
      name: "阿勒泰地区",
      id: "654300"
    },
    {
      province: "新疆维吾尔自治区",
      name: "自治区直辖县级行政区划",
      id: "659000"
    }
  ]
  };

  var province = [
    {
      "name": "北京市",
      "id": "110000"
    },
    {
      "name": "天津市",
      "id": "120000"
    },
    {
      "name": "河北省",
      "id": "130000"
    },
    {
      "name": "山西省",
      "id": "140000"
    },
    {
      "name": "内蒙古自治区",
      "id": "150000"
    },
    {
      "name": "辽宁省",
      "id": "210000"
    },
    {
      "name": "吉林省",
      "id": "220000"
    },
    {
      "name": "黑龙江省",
      "id": "230000"
    },
    {
      "name": "上海市",
      "id": "310000"
    },
    {
      "name": "江苏省",
      "id": "320000"
    },
    {
      "name": "浙江省",
      "id": "330000"
    },
    {
      "name": "安徽省",
      "id": "340000"
    },
    {
      "name": "福建省",
      "id": "350000"
    },
    {
      "name": "江西省",
      "id": "360000"
    },
    {
      "name": "山东省",
      "id": "370000"
    },
    {
      "name": "河南省",
      "id": "410000"
    },
    {
      "name": "湖北省",
      "id": "420000"
    },
    {
      "name": "湖南省",
      "id": "430000"
    },
    {
      "name": "广东省",
      "id": "440000"
    },
    {
      "name": "广西壮族自治区",
      "id": "450000"
    },
    {
      "name": "海南省",
      "id": "460000"
    },
    {
      "name": "重庆市",
      "id": "500000"
    },
    {
      "name": "四川省",
      "id": "510000"
    },
    {
      "name": "贵州省",
      "id": "520000"
    },
    {
      "name": "云南省",
      "id": "530000"
    },
    {
      "name": "西藏自治区",
      "id": "540000"
    },
    {
      "name": "陕西省",
      "id": "610000"
    },
    {
      "name": "甘肃省",
      "id": "620000"
    },
    {
      "name": "青海省",
      "id": "630000"
    },
    {
      "name": "宁夏回族自治区",
      "id": "640000"
    },
    {
      "name": "新疆维吾尔自治区",
      "id": "650000"
    },
    {
      "name": "台湾省",
      "id": "710000"
    },
    {
      "name": "香港特别行政区",
      "id": "810000"
    },
    {
      "name": "澳门特别行政区",
      "id": "820000"
    }
  ]
  ;

  function getProvince(req, res) {
    return res.json(province);
  }

  function getCity(req, res) {
    return res.json(city[req.params.province]);
  }

  var geographic = {
    'GET /api/geographic/province': getProvince,
    'GET /api/geographic/city/:province': getCity
  };

  const getNotices = (req, res) => res.json([{
    id: '000000001',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    title: '你收到了 14 份新周报',
    datetime: '2017-08-09',
    type: 'notification'
  }, {
    id: '000000002',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
    title: '你推荐的 曲妮妮 已通过第三轮面试',
    datetime: '2017-08-08',
    type: 'notification'
  }, {
    id: '000000003',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
    title: '这种模板可以区分多种通知类型',
    datetime: '2017-08-07',
    read: true,
    type: 'notification'
  }, {
    id: '000000004',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
    title: '左侧图标用于区分不同的类型',
    datetime: '2017-08-07',
    type: 'notification'
  }, {
    id: '000000005',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    title: '内容不要超过两行字，超出时自动截断',
    datetime: '2017-08-07',
    type: 'notification'
  }, {
    id: '000000006',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: '曲丽丽 评论了你',
    description: '描述信息描述信息描述信息',
    datetime: '2017-08-07',
    type: 'message',
    clickClose: true
  }, {
    id: '000000007',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: '朱偏右 回复了你',
    description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
    datetime: '2017-08-07',
    type: 'message',
    clickClose: true
  }, {
    id: '000000008',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: '标题',
    description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
    datetime: '2017-08-07',
    type: 'message',
    clickClose: true
  }, {
    id: '000000009',
    title: '任务名称',
    description: '任务需要在 2017-01-12 20:00 前启动',
    extra: '未开始',
    status: 'todo',
    type: 'event'
  }, {
    id: '000000010',
    title: '第三方紧急代码变更',
    description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
    extra: '马上到期',
    status: 'urgent',
    type: 'event'
  }, {
    id: '000000011',
    title: '信息安全考试',
    description: '指派竹尔于 2017-01-09 前完成更新并发布',
    extra: '已耗时 8 天',
    status: 'doing',
    type: 'event'
  }, {
    id: '000000012',
    title: 'ABCD 版本发布',
    description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
    extra: '进行中',
    status: 'processing',
    type: 'event'
  }]);

  var notices = {
    'GET /api/notices': getNotices
  };

  const basicGoods = [{
    id: '1234561',
    name: '矿泉水 550ml',
    barcode: '12421432143214321',
    price: '2.00',
    num: '1',
    amount: '2.00'
  }, {
    id: '1234562',
    name: '凉茶 300ml',
    barcode: '12421432143214322',
    price: '3.00',
    num: '2',
    amount: '6.00'
  }, {
    id: '1234563',
    name: '好吃的薯片',
    barcode: '12421432143214323',
    price: '7.00',
    num: '4',
    amount: '28.00'
  }, {
    id: '1234564',
    name: '特别好吃的蛋卷',
    barcode: '12421432143214324',
    price: '8.50',
    num: '3',
    amount: '25.50'
  }];
  const basicProgress = [{
    key: '1',
    time: '2017-10-01 14:10',
    rate: '联系客户',
    status: 'processing',
    operator: '取货员 ID1234',
    cost: '5mins'
  }, {
    key: '2',
    time: '2017-10-01 14:05',
    rate: '取货员出发',
    status: 'success',
    operator: '取货员 ID1234',
    cost: '1h'
  }, {
    key: '3',
    time: '2017-10-01 13:05',
    rate: '取货员接单',
    status: 'success',
    operator: '取货员 ID1234',
    cost: '5mins'
  }, {
    key: '4',
    time: '2017-10-01 13:00',
    rate: '申请审批通过',
    status: 'success',
    operator: '系统',
    cost: '1h'
  }, {
    key: '5',
    time: '2017-10-01 12:00',
    rate: '发起退货申请',
    status: 'success',
    operator: '用户',
    cost: '5mins'
  }];
  const advancedOperation1 = [{
    key: 'op1',
    type: '订购关系生效',
    name: '曲丽丽',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-'
  }, {
    key: 'op2',
    type: '财务复审',
    name: '付小小',
    status: 'reject',
    updatedAt: '2017-10-03  19:23:12',
    memo: '不通过原因'
  }, {
    key: 'op3',
    type: '部门初审',
    name: '周毛毛',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-'
  }, {
    key: 'op4',
    type: '提交订单',
    name: '林东东',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '很棒'
  }, {
    key: 'op5',
    type: '创建订单',
    name: '汗牙牙',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-'
  }];
  const advancedOperation2 = [{
    key: 'op1',
    type: '订购关系生效',
    name: '曲丽丽',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-'
  }];
  const advancedOperation3 = [{
    key: 'op1',
    type: '创建订单',
    name: '汗牙牙',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-'
  }];
  const getProfileAdvancedData = {
    advancedOperation1,
    advancedOperation2,
    advancedOperation3
  };
  const {
    Random
  } = mockjs;
  var profile = {
    'GET /api/profile/advanced': getProfileAdvancedData,
    'GET /api/profile/basic': (req, res) => {
      const {
        id
      } = req.query;
      const application = {
        id,
        status: '已取货',
        orderNo: Random.id(),
        childOrderNo: Random.id()
      };
      const userInfo = {
        name: Random.cname(),
        tel: '18100000000',
        delivery: '菜鸟物流',
        addr: '浙江省杭州市西湖区万塘路18号',
        remark: '备注'
      };
      res.json({
        userInfo,
        application,
        basicGoods,
        basicProgress
      });
    }
  };

  /*! https://mths.be/punycode v1.4.1 by @mathias */

  /** Highest positive signed 32-bit float value */
  var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

  /** Bootstring parameters */

  var base = 36;
  var tMin = 1;
  var tMax = 26;
  var skew = 38;
  var damp = 700;
  var initialBias = 72;
  var initialN = 128; // 0x80

  var delimiter = '-'; // '\x2D'
  var regexNonASCII = /[^\x20-\x7E]/; // unprintable ASCII chars + non-ASCII chars

  var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

  /** Error messages */

  var errors = {
    'overflow': 'Overflow: input needs wider integers to process',
    'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
    'invalid-input': 'Invalid input'
  };
  /** Convenience shortcuts */

  var baseMinusTMin = base - tMin;
  var floor = Math.floor;
  var stringFromCharCode = String.fromCharCode;
  /*--------------------------------------------------------------------------*/

  /**
   * A generic error utility function.
   * @private
   * @param {String} type The error type.
   * @returns {Error} Throws a `RangeError` with the applicable error message.
   */

  function error(type) {
    throw new RangeError(errors[type]);
  }
  /**
   * A generic `Array#map` utility function.
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function that gets called for every array
   * item.
   * @returns {Array} A new array of values returned by the callback function.
   */


  function map(array, fn) {
    var length = array.length;
    var result = [];

    while (length--) {
      result[length] = fn(array[length]);
    }

    return result;
  }
  /**
   * A simple `Array#map`-like wrapper to work with domain name strings or email
   * addresses.
   * @private
   * @param {String} domain The domain name or email address.
   * @param {Function} callback The function that gets called for every
   * character.
   * @returns {Array} A new string of characters returned by the callback
   * function.
   */


  function mapDomain(string, fn) {
    var parts = string.split('@');
    var result = '';

    if (parts.length > 1) {
      // In email addresses, only the domain name should be punycoded. Leave
      // the local part (i.e. everything up to `@`) intact.
      result = parts[0] + '@';
      string = parts[1];
    } // Avoid `split(regex)` for IE8 compatibility. See #17.


    string = string.replace(regexSeparators, '\x2E');
    var labels = string.split('.');
    var encoded = map(labels, fn).join('.');
    return result + encoded;
  }
  /**
   * Creates an array containing the numeric code points of each Unicode
   * character in the string. While JavaScript uses UCS-2 internally,
   * this function will convert a pair of surrogate halves (each of which
   * UCS-2 exposes as separate characters) into a single code point,
   * matching UTF-16.
   * @see `punycode.ucs2.encode`
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode.ucs2
   * @name decode
   * @param {String} string The Unicode input string (UCS-2).
   * @returns {Array} The new array of code points.
   */


  function ucs2decode(string) {
    var output = [],
        counter = 0,
        length = string.length,
        value,
        extra;

    while (counter < length) {
      value = string.charCodeAt(counter++);

      if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
        // high surrogate, and there is a next character
        extra = string.charCodeAt(counter++);

        if ((extra & 0xFC00) == 0xDC00) {
          // low surrogate
          output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
        } else {
          // unmatched surrogate; only append this code unit, in case the next
          // code unit is the high surrogate of a surrogate pair
          output.push(value);
          counter--;
        }
      } else {
        output.push(value);
      }
    }

    return output;
  }
  /**
   * Converts a digit/integer into a basic code point.
   * @see `basicToDigit()`
   * @private
   * @param {Number} digit The numeric value of a basic code point.
   * @returns {Number} The basic code point whose value (when used for
   * representing integers) is `digit`, which needs to be in the range
   * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
   * used; else, the lowercase form is used. The behavior is undefined
   * if `flag` is non-zero and `digit` has no uppercase form.
   */


  function digitToBasic(digit, flag) {
    //  0..25 map to ASCII a..z or A..Z
    // 26..35 map to ASCII 0..9
    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
  }
  /**
   * Bias adaptation function as per section 3.4 of RFC 3492.
   * https://tools.ietf.org/html/rfc3492#section-3.4
   * @private
   */


  function adapt(delta, numPoints, firstTime) {
    var k = 0;
    delta = firstTime ? floor(delta / damp) : delta >> 1;
    delta += floor(delta / numPoints);

    for (;
    /* no initialization */
    delta > baseMinusTMin * tMax >> 1; k += base) {
      delta = floor(delta / baseMinusTMin);
    }

    return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
  }
  /**
   * Converts a string of Unicode symbols (e.g. a domain name label) to a
   * Punycode string of ASCII-only symbols.
   * @memberOf punycode
   * @param {String} input The string of Unicode symbols.
   * @returns {String} The resulting Punycode string of ASCII-only symbols.
   */

  function encode(input) {
    var n,
        delta,
        handledCPCount,
        basicLength,
        bias,
        j,
        m,
        q,
        k,
        t,
        currentValue,
        output = [],

    /** `inputLength` will hold the number of code points in `input`. */
    inputLength,

    /** Cached calculation results */
    handledCPCountPlusOne,
        baseMinusT,
        qMinusT; // Convert the input in UCS-2 to Unicode

    input = ucs2decode(input); // Cache the length

    inputLength = input.length; // Initialize the state

    n = initialN;
    delta = 0;
    bias = initialBias; // Handle the basic code points

    for (j = 0; j < inputLength; ++j) {
      currentValue = input[j];

      if (currentValue < 0x80) {
        output.push(stringFromCharCode(currentValue));
      }
    }

    handledCPCount = basicLength = output.length; // `handledCPCount` is the number of code points that have been handled;
    // `basicLength` is the number of basic code points.
    // Finish the basic string - if it is not empty - with a delimiter

    if (basicLength) {
      output.push(delimiter);
    } // Main encoding loop:


    while (handledCPCount < inputLength) {
      // All non-basic code points < n have been handled already. Find the next
      // larger one:
      for (m = maxInt, j = 0; j < inputLength; ++j) {
        currentValue = input[j];

        if (currentValue >= n && currentValue < m) {
          m = currentValue;
        }
      } // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
      // but guard against overflow


      handledCPCountPlusOne = handledCPCount + 1;

      if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
        error('overflow');
      }

      delta += (m - n) * handledCPCountPlusOne;
      n = m;

      for (j = 0; j < inputLength; ++j) {
        currentValue = input[j];

        if (currentValue < n && ++delta > maxInt) {
          error('overflow');
        }

        if (currentValue == n) {
          // Represent delta as a generalized variable-length integer
          for (q = delta, k = base;;
          /* no condition */
          k += base) {
            t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

            if (q < t) {
              break;
            }

            qMinusT = q - t;
            baseMinusT = base - t;
            output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
            q = floor(qMinusT / baseMinusT);
          }

          output.push(stringFromCharCode(digitToBasic(q, 0)));
          bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
          delta = 0;
          ++handledCPCount;
        }
      }

      ++delta;
      ++n;
    }

    return output.join('');
  }
  /**
   * Converts a Unicode string representing a domain name or an email address to
   * Punycode. Only the non-ASCII parts of the domain name will be converted,
   * i.e. it doesn't matter if you call it with a domain that's already in
   * ASCII.
   * @memberOf punycode
   * @param {String} input The domain name or email address to convert, as a
   * Unicode string.
   * @returns {String} The Punycode representation of the given domain name or
   * email address.
   */

  function toASCII(input) {
    return mapDomain(input, function (string) {
      return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
    });
  }

  // shim for using process in browser

  if (typeof global.setTimeout === 'function') ;

  if (typeof global.clearTimeout === 'function') ;

  var performance = global.performance || {};

  var performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () {
    return new Date().getTime();
  }; // generate timestamp or delta

  // Copyright Joyent, Inc. and other Node contributors.
  function isNull(arg) {
    return arg === null;
  }
  function isNullOrUndefined(arg) {
    return arg == null;
  }
  function isString(arg) {
    return typeof arg === 'string';
  }
  function isObject(arg) {
    return typeof arg === 'object' && arg !== null;
  }

  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.
  // If obj.hasOwnProperty has been overridden, then calling
  // obj.hasOwnProperty(prop) will break.
  // See: https://github.com/joyent/node/issues/1707
  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
  };

  function stringifyPrimitive(v) {
    switch (typeof v) {
      case 'string':
        return v;

      case 'boolean':
        return v ? 'true' : 'false';

      case 'number':
        return isFinite(v) ? v : '';

      default:
        return '';
    }
  }

  function stringify(obj, sep, eq, name) {
    sep = sep || '&';
    eq = eq || '=';

    if (obj === null) {
      obj = undefined;
    }

    if (typeof obj === 'object') {
      return map$1(objectKeys(obj), function (k) {
        var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;

        if (isArray(obj[k])) {
          return map$1(obj[k], function (v) {
            return ks + encodeURIComponent(stringifyPrimitive(v));
          }).join(sep);
        } else {
          return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
        }
      }).join(sep);
    }

    if (!name) return '';
    return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
  }

  function map$1(xs, f) {
    if (xs.map) return xs.map(f);
    var res = [];

    for (var i = 0; i < xs.length; i++) {
      res.push(f(xs[i], i));
    }

    return res;
  }

  var objectKeys = Object.keys || function (obj) {
    var res = [];

    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
    }

    return res;
  };

  function parse(qs, sep, eq, options) {
    sep = sep || '&';
    eq = eq || '=';
    var obj = {};

    if (typeof qs !== 'string' || qs.length === 0) {
      return obj;
    }

    var regexp = /\+/g;
    qs = qs.split(sep);
    var maxKeys = 1000;

    if (options && typeof options.maxKeys === 'number') {
      maxKeys = options.maxKeys;
    }

    var len = qs.length; // maxKeys <= 0 means that we should not limit keys count

    if (maxKeys > 0 && len > maxKeys) {
      len = maxKeys;
    }

    for (var i = 0; i < len; ++i) {
      var x = qs[i].replace(regexp, '%20'),
          idx = x.indexOf(eq),
          kstr,
          vstr,
          k,
          v;

      if (idx >= 0) {
        kstr = x.substr(0, idx);
        vstr = x.substr(idx + 1);
      } else {
        kstr = x;
        vstr = '';
      }

      k = decodeURIComponent(kstr);
      v = decodeURIComponent(vstr);

      if (!hasOwnProperty(obj, k)) {
        obj[k] = v;
      } else if (isArray(obj[k])) {
        obj[k].push(v);
      } else {
        obj[k] = [obj[k], v];
      }
    }

    return obj;
  }

  // Copyright Joyent, Inc. and other Node contributors.
  function Url() {
    this.protocol = null;
    this.slashes = null;
    this.auth = null;
    this.host = null;
    this.port = null;
    this.hostname = null;
    this.hash = null;
    this.search = null;
    this.query = null;
    this.pathname = null;
    this.path = null;
    this.href = null;
  } // Reference: RFC 3986, RFC 1808, RFC 2396
  // define these here so at least they only have to be
  // compiled once on the first module load.

  var protocolPattern = /^([a-z0-9.+-]+:)/i,
      portPattern = /:[0-9]*$/,
      // Special case for a simple path URL
  simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
      // RFC 2396: characters reserved for delimiting URLs.
  // We actually just auto-escape these.
  delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
      // RFC 2396: characters not allowed for various reasons.
  unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
      // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
  autoEscape = ['\''].concat(unwise),
      // Characters that are never ever allowed in a hostname.
  // Note that any invalid chars are also handled, but these
  // are the ones that are *expected* to be seen, so we fast-path
  // them.
  nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
      hostEndingChars = ['/', '?', '#'],
      hostnameMaxLen = 255,
      hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
      hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
      // protocols that can allow "unsafe" and "unwise" chars.
  unsafeProtocol = {
    'javascript': true,
    'javascript:': true
  },
      // protocols that never have a hostname.
  hostlessProtocol = {
    'javascript': true,
    'javascript:': true
  },
      // protocols that always contain a // bit.
  slashedProtocol = {
    'http': true,
    'https': true,
    'ftp': true,
    'gopher': true,
    'file': true,
    'http:': true,
    'https:': true,
    'ftp:': true,
    'gopher:': true,
    'file:': true
  };

  function urlParse(url, parseQueryString, slashesDenoteHost) {
    if (url && isObject(url) && url instanceof Url) return url;
    var u = new Url();
    u.parse(url, parseQueryString, slashesDenoteHost);
    return u;
  }

  Url.prototype.parse = function (url, parseQueryString, slashesDenoteHost) {
    return parse$1(this, url, parseQueryString, slashesDenoteHost);
  };

  function parse$1(self, url, parseQueryString, slashesDenoteHost) {
    if (!isString(url)) {
      throw new TypeError('Parameter \'url\' must be a string, not ' + typeof url);
    } // Copy chrome, IE, opera backslash-handling behavior.
    // Back slashes before the query string get converted to forward slashes
    // See: https://code.google.com/p/chromium/issues/detail?id=25916


    var queryIndex = url.indexOf('?'),
        splitter = queryIndex !== -1 && queryIndex < url.indexOf('#') ? '?' : '#',
        uSplit = url.split(splitter),
        slashRegex = /\\/g;
    uSplit[0] = uSplit[0].replace(slashRegex, '/');
    url = uSplit.join(splitter);
    var rest = url; // trim before proceeding.
    // This is to support parse stuff like "  http://foo.com  \n"

    rest = rest.trim();

    if (!slashesDenoteHost && url.split('#').length === 1) {
      // Try fast path regexp
      var simplePath = simplePathPattern.exec(rest);

      if (simplePath) {
        self.path = rest;
        self.href = rest;
        self.pathname = simplePath[1];

        if (simplePath[2]) {
          self.search = simplePath[2];

          if (parseQueryString) {
            self.query = parse(self.search.substr(1));
          } else {
            self.query = self.search.substr(1);
          }
        } else if (parseQueryString) {
          self.search = '';
          self.query = {};
        }

        return self;
      }
    }

    var proto = protocolPattern.exec(rest);

    if (proto) {
      proto = proto[0];
      var lowerProto = proto.toLowerCase();
      self.protocol = lowerProto;
      rest = rest.substr(proto.length);
    } // figure out if it's got a host
    // user@server is *always* interpreted as a hostname, and url
    // resolution will treat //foo/bar as host=foo,path=bar because that's
    // how the browser resolves relative URLs.


    if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
      var slashes = rest.substr(0, 2) === '//';

      if (slashes && !(proto && hostlessProtocol[proto])) {
        rest = rest.substr(2);
        self.slashes = true;
      }
    }

    var i, hec, l, p;

    if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
      // there's a hostname.
      // the first instance of /, ?, ;, or # ends the host.
      //
      // If there is an @ in the hostname, then non-host chars *are* allowed
      // to the left of the last @ sign, unless some host-ending character
      // comes *before* the @-sign.
      // URLs are obnoxious.
      //
      // ex:
      // http://a@b@c/ => user:a@b host:c
      // http://a@b?@c => user:a host:c path:/?@c
      // v0.12 TODO(isaacs): This is not quite how Chrome does things.
      // Review our test case against browsers more comprehensively.
      // find the first instance of any hostEndingChars
      var hostEnd = -1;

      for (i = 0; i < hostEndingChars.length; i++) {
        hec = rest.indexOf(hostEndingChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
      } // at this point, either we have an explicit point where the
      // auth portion cannot go past, or the last @ char is the decider.


      var auth, atSign;

      if (hostEnd === -1) {
        // atSign can be anywhere.
        atSign = rest.lastIndexOf('@');
      } else {
        // atSign must be in auth portion.
        // http://a@b/c@d => host:b auth:a path:/c@d
        atSign = rest.lastIndexOf('@', hostEnd);
      } // Now we have a portion which is definitely the auth.
      // Pull that off.


      if (atSign !== -1) {
        auth = rest.slice(0, atSign);
        rest = rest.slice(atSign + 1);
        self.auth = decodeURIComponent(auth);
      } // the host is the remaining to the left of the first non-host char


      hostEnd = -1;

      for (i = 0; i < nonHostChars.length; i++) {
        hec = rest.indexOf(nonHostChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
      } // if we still have not hit it, then the entire thing is a host.


      if (hostEnd === -1) hostEnd = rest.length;
      self.host = rest.slice(0, hostEnd);
      rest = rest.slice(hostEnd); // pull out port.

      parseHost(self); // we've indicated that there is a hostname,
      // so even if it's empty, it has to be present.

      self.hostname = self.hostname || ''; // if hostname begins with [ and ends with ]
      // assume that it's an IPv6 address.

      var ipv6Hostname = self.hostname[0] === '[' && self.hostname[self.hostname.length - 1] === ']'; // validate a little.

      if (!ipv6Hostname) {
        var hostparts = self.hostname.split(/\./);

        for (i = 0, l = hostparts.length; i < l; i++) {
          var part = hostparts[i];
          if (!part) continue;

          if (!part.match(hostnamePartPattern)) {
            var newpart = '';

            for (var j = 0, k = part.length; j < k; j++) {
              if (part.charCodeAt(j) > 127) {
                // we replace non-ASCII char with a temporary placeholder
                // we need this to make sure size of hostname is not
                // broken by replacing non-ASCII by nothing
                newpart += 'x';
              } else {
                newpart += part[j];
              }
            } // we test again with ASCII char only


            if (!newpart.match(hostnamePartPattern)) {
              var validParts = hostparts.slice(0, i);
              var notHost = hostparts.slice(i + 1);
              var bit = part.match(hostnamePartStart);

              if (bit) {
                validParts.push(bit[1]);
                notHost.unshift(bit[2]);
              }

              if (notHost.length) {
                rest = '/' + notHost.join('.') + rest;
              }

              self.hostname = validParts.join('.');
              break;
            }
          }
        }
      }

      if (self.hostname.length > hostnameMaxLen) {
        self.hostname = '';
      } else {
        // hostnames are always lower case.
        self.hostname = self.hostname.toLowerCase();
      }

      if (!ipv6Hostname) {
        // IDNA Support: Returns a punycoded representation of "domain".
        // It only converts parts of the domain name that
        // have non-ASCII characters, i.e. it doesn't matter if
        // you call it with a domain that already is ASCII-only.
        self.hostname = toASCII(self.hostname);
      }

      p = self.port ? ':' + self.port : '';
      var h = self.hostname || '';
      self.host = h + p;
      self.href += self.host; // strip [ and ] from the hostname
      // the host field still retains them, though

      if (ipv6Hostname) {
        self.hostname = self.hostname.substr(1, self.hostname.length - 2);

        if (rest[0] !== '/') {
          rest = '/' + rest;
        }
      }
    } // now rest is set to the post-host stuff.
    // chop off any delim chars.


    if (!unsafeProtocol[lowerProto]) {
      // First, make 100% sure that any "autoEscape" chars get
      // escaped, even if encodeURIComponent doesn't think they
      // need to be.
      for (i = 0, l = autoEscape.length; i < l; i++) {
        var ae = autoEscape[i];
        if (rest.indexOf(ae) === -1) continue;
        var esc = encodeURIComponent(ae);

        if (esc === ae) {
          esc = escape(ae);
        }

        rest = rest.split(ae).join(esc);
      }
    } // chop off from the tail first.


    var hash = rest.indexOf('#');

    if (hash !== -1) {
      // got a fragment string.
      self.hash = rest.substr(hash);
      rest = rest.slice(0, hash);
    }

    var qm = rest.indexOf('?');

    if (qm !== -1) {
      self.search = rest.substr(qm);
      self.query = rest.substr(qm + 1);

      if (parseQueryString) {
        self.query = parse(self.query);
      }

      rest = rest.slice(0, qm);
    } else if (parseQueryString) {
      // no query string, but parseQueryString still requested
      self.search = '';
      self.query = {};
    }

    if (rest) self.pathname = rest;

    if (slashedProtocol[lowerProto] && self.hostname && !self.pathname) {
      self.pathname = '/';
    } //to support http.request


    if (self.pathname || self.search) {
      p = self.pathname || '';
      var s = self.search || '';
      self.path = p + s;
    } // finally, reconstruct the href based on what has been validated.


    self.href = format(self);
    return self;
  } // format a parsed object into a url string

  function format(self) {
    var auth = self.auth || '';

    if (auth) {
      auth = encodeURIComponent(auth);
      auth = auth.replace(/%3A/i, ':');
      auth += '@';
    }

    var protocol = self.protocol || '',
        pathname = self.pathname || '',
        hash = self.hash || '',
        host = false,
        query = '';

    if (self.host) {
      host = auth + self.host;
    } else if (self.hostname) {
      host = auth + (self.hostname.indexOf(':') === -1 ? self.hostname : '[' + this.hostname + ']');

      if (self.port) {
        host += ':' + self.port;
      }
    }

    if (self.query && isObject(self.query) && Object.keys(self.query).length) {
      query = stringify(self.query);
    }

    var search = self.search || query && '?' + query || '';
    if (protocol && protocol.substr(-1) !== ':') protocol += ':'; // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
    // unless they had them to begin with.

    if (self.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
      host = '//' + (host || '');
      if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
    } else if (!host) {
      host = '';
    }

    if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
    if (search && search.charAt(0) !== '?') search = '?' + search;
    pathname = pathname.replace(/[?#]/g, function (match) {
      return encodeURIComponent(match);
    });
    search = search.replace('#', '%23');
    return protocol + host + pathname + search + hash;
  }

  Url.prototype.format = function () {
    return format(this);
  };

  Url.prototype.resolve = function (relative) {
    return this.resolveObject(urlParse(relative, false, true)).format();
  };

  Url.prototype.resolveObject = function (relative) {
    if (isString(relative)) {
      var rel = new Url();
      rel.parse(relative, false, true);
      relative = rel;
    }

    var result = new Url();
    var tkeys = Object.keys(this);

    for (var tk = 0; tk < tkeys.length; tk++) {
      var tkey = tkeys[tk];
      result[tkey] = this[tkey];
    } // hash is always overridden, no matter what.
    // even href="" will remove it.


    result.hash = relative.hash; // if the relative url is empty, then there's nothing left to do here.

    if (relative.href === '') {
      result.href = result.format();
      return result;
    } // hrefs like //foo/bar always cut to the protocol.


    if (relative.slashes && !relative.protocol) {
      // take everything except the protocol from relative
      var rkeys = Object.keys(relative);

      for (var rk = 0; rk < rkeys.length; rk++) {
        var rkey = rkeys[rk];
        if (rkey !== 'protocol') result[rkey] = relative[rkey];
      } //urlParse appends trailing / to urls like http://www.example.com


      if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
        result.path = result.pathname = '/';
      }

      result.href = result.format();
      return result;
    }

    var relPath;

    if (relative.protocol && relative.protocol !== result.protocol) {
      // if it's a known url protocol, then changing
      // the protocol does weird things
      // first, if it's not file:, then we MUST have a host,
      // and if there was a path
      // to begin with, then we MUST have a path.
      // if it is file:, then the host is dropped,
      // because that's known to be hostless.
      // anything else is assumed to be absolute.
      if (!slashedProtocol[relative.protocol]) {
        var keys = Object.keys(relative);

        for (var v = 0; v < keys.length; v++) {
          var k = keys[v];
          result[k] = relative[k];
        }

        result.href = result.format();
        return result;
      }

      result.protocol = relative.protocol;

      if (!relative.host && !hostlessProtocol[relative.protocol]) {
        relPath = (relative.pathname || '').split('/');

        while (relPath.length && !(relative.host = relPath.shift()));

        if (!relative.host) relative.host = '';
        if (!relative.hostname) relative.hostname = '';
        if (relPath[0] !== '') relPath.unshift('');
        if (relPath.length < 2) relPath.unshift('');
        result.pathname = relPath.join('/');
      } else {
        result.pathname = relative.pathname;
      }

      result.search = relative.search;
      result.query = relative.query;
      result.host = relative.host || '';
      result.auth = relative.auth;
      result.hostname = relative.hostname || relative.host;
      result.port = relative.port; // to support http.request

      if (result.pathname || result.search) {
        var p = result.pathname || '';
        var s = result.search || '';
        result.path = p + s;
      }

      result.slashes = result.slashes || relative.slashes;
      result.href = result.format();
      return result;
    }

    var isSourceAbs = result.pathname && result.pathname.charAt(0) === '/',
        isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === '/',
        mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname,
        removeAllDots = mustEndAbs,
        srcPath = result.pathname && result.pathname.split('/') || [],
        psychotic = result.protocol && !slashedProtocol[result.protocol];
    relPath = relative.pathname && relative.pathname.split('/') || []; // if the url is a non-slashed url, then relative
    // links like ../.. should be able
    // to crawl up to the hostname, as well.  This is strange.
    // result.protocol has already been set by now.
    // Later on, put the first path part into the host field.

    if (psychotic) {
      result.hostname = '';
      result.port = null;

      if (result.host) {
        if (srcPath[0] === '') srcPath[0] = result.host;else srcPath.unshift(result.host);
      }

      result.host = '';

      if (relative.protocol) {
        relative.hostname = null;
        relative.port = null;

        if (relative.host) {
          if (relPath[0] === '') relPath[0] = relative.host;else relPath.unshift(relative.host);
        }

        relative.host = null;
      }

      mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
    }

    var authInHost;

    if (isRelAbs) {
      // it's absolute.
      result.host = relative.host || relative.host === '' ? relative.host : result.host;
      result.hostname = relative.hostname || relative.hostname === '' ? relative.hostname : result.hostname;
      result.search = relative.search;
      result.query = relative.query;
      srcPath = relPath; // fall through to the dot-handling below.
    } else if (relPath.length) {
      // it's relative
      // throw away the existing file, and take the new path instead.
      if (!srcPath) srcPath = [];
      srcPath.pop();
      srcPath = srcPath.concat(relPath);
      result.search = relative.search;
      result.query = relative.query;
    } else if (!isNullOrUndefined(relative.search)) {
      // just pull out the search.
      // like href='?foo'.
      // Put this after the other two cases because it simplifies the booleans
      if (psychotic) {
        result.hostname = result.host = srcPath.shift(); //occationaly the auth can get stuck only in host
        //this especially happens in cases like
        //url.resolveObject('mailto:local1@domain1', 'local2@domain2')

        authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;

        if (authInHost) {
          result.auth = authInHost.shift();
          result.host = result.hostname = authInHost.shift();
        }
      }

      result.search = relative.search;
      result.query = relative.query; //to support http.request

      if (!isNull(result.pathname) || !isNull(result.search)) {
        result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
      }

      result.href = result.format();
      return result;
    }

    if (!srcPath.length) {
      // no path at all.  easy.
      // we've already handled the other stuff above.
      result.pathname = null; //to support http.request

      if (result.search) {
        result.path = '/' + result.search;
      } else {
        result.path = null;
      }

      result.href = result.format();
      return result;
    } // if a url ENDs in . or .., then it must get a trailing slash.
    // however, if it ends in anything else non-slashy,
    // then it must NOT get a trailing slash.


    var last = srcPath.slice(-1)[0];
    var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === '.' || last === '..') || last === ''; // strip single dots, resolve double dots to parent dir
    // if the path tries to go above the root, `up` ends up > 0

    var up = 0;

    for (var i = srcPath.length; i >= 0; i--) {
      last = srcPath[i];

      if (last === '.') {
        srcPath.splice(i, 1);
      } else if (last === '..') {
        srcPath.splice(i, 1);
        up++;
      } else if (up) {
        srcPath.splice(i, 1);
        up--;
      }
    } // if the path is allowed to go above the root, restore leading ..s


    if (!mustEndAbs && !removeAllDots) {
      for (; up--; up) {
        srcPath.unshift('..');
      }
    }

    if (mustEndAbs && srcPath[0] !== '' && (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
      srcPath.unshift('');
    }

    if (hasTrailingSlash && srcPath.join('/').substr(-1) !== '/') {
      srcPath.push('');
    }

    var isAbsolute = srcPath[0] === '' || srcPath[0] && srcPath[0].charAt(0) === '/'; // put the host back

    if (psychotic) {
      result.hostname = result.host = isAbsolute ? '' : srcPath.length ? srcPath.shift() : ''; //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')

      authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;

      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }

    mustEndAbs = mustEndAbs || result.host && srcPath.length;

    if (mustEndAbs && !isAbsolute) {
      srcPath.unshift('');
    }

    if (!srcPath.length) {
      result.pathname = null;
      result.path = null;
    } else {
      result.pathname = srcPath.join('/');
    } //to support request.http


    if (!isNull(result.pathname) || !isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
    }

    result.auth = relative.auth || result.auth;
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  };

  Url.prototype.parseHost = function () {
    return parseHost(this);
  };

  function parseHost(self) {
    var host = self.host;
    var port = portPattern.exec(host);

    if (port) {
      port = port[0];

      if (port !== ':') {
        self.port = port.substr(1);
      }

      host = host.substr(0, host.length - port.length);
    }

    if (host) self.hostname = host;
  }

  let tableListDataSource = [];

  for (let i = 0; i < 46; i += 1) {
    tableListDataSource.push({
      key: i,
      disabled: i % 6 === 0,
      href: 'https://ant.design',
      avatar: ['https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png'][i % 2],
      name: `TradeCode ${i}`,
      title: `一个任务名称 ${i}`,
      owner: '曲丽丽',
      desc: '这是一段描述',
      callNo: Math.floor(Math.random() * 1000),
      status: Math.floor(Math.random() * 10) % 4,
      updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
      createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
      progress: Math.ceil(Math.random() * 100)
    });
  }

  function getRule(req, res, u) {
    let url = u;

    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
      url = req.url; // eslint-disable-line
    }

    const params = urlParse(url, true).query;
    let dataSource = tableListDataSource;

    if (params.sorter) {
      const s = params.sorter.split('_');
      dataSource = dataSource.sort((prev, next) => {
        if (s[1] === 'descend') {
          return next[s[0]] - prev[s[0]];
        }

        return prev[s[0]] - next[s[0]];
      });
    }

    if (params.status) {
      const status = params.status.split(',');
      let filterDataSource = [];
      status.forEach(s => {
        filterDataSource = filterDataSource.concat(dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10)));
      });
      dataSource = filterDataSource;
    }

    if (params.name) {
      dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
    }

    let pageSize = 10;

    if (params.pageSize) {
      pageSize = params.pageSize * 1;
    }

    const result = {
      list: dataSource,
      pagination: {
        total: dataSource.length,
        pageSize,
        current: parseInt(params.currentPage, 10) || 1
      }
    };
    return res.json(result);
  }

  function postRule(req, res, u, b) {
    let url = u;

    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
      url = req.url; // eslint-disable-line
    }

    const body = b && b.body || req.body;
    const {
      method,
      name,
      desc,
      key
    } = body;

    switch (method) {
      /* eslint no-case-declarations:0 */
      case 'delete':
        tableListDataSource = tableListDataSource.filter(item => key.indexOf(item.key) === -1);
        break;

      case 'post':
        const i = Math.ceil(Math.random() * 10000);
        tableListDataSource.unshift({
          key: i,
          href: 'https://ant.design',
          avatar: ['https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png'][i % 2],
          name: `TradeCode ${i}`,
          title: `一个任务名称 ${i}`,
          owner: '曲丽丽',
          desc,
          callNo: Math.floor(Math.random() * 1000),
          status: Math.floor(Math.random() * 10) % 2,
          updatedAt: new Date(),
          createdAt: new Date(),
          progress: Math.ceil(Math.random() * 100)
        });
        break;

      case 'update':
        tableListDataSource = tableListDataSource.map(item => {
          if (item.key === key) {
            Object.assign(item, {
              desc,
              name
            });
            return item;
          }

          return item;
        });
        break;

      default:
        break;
    }

    return getRule(req, res, u);
  }

  var rule = {
    'GET /api/rule': getRule,
    'POST /api/rule': postRule
  };

  // 代码中会兼容本地 service mock 以及部署站点的静态数据
  var user$1 = {
    // 支持值为 Object 和 Array
    'GET /api/currentUser': {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      email: 'antdesign@alipay.com',
      signature: '海纳百川，有容乃大',
      title: '交互专家',
      group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
      notice: [
        {
          id: 'xxx1',
          title: titles[0],
          logo: avatars[0],
          description: '那是一种内在的东西，他们到达不了，也无法触及的',
          updatedAt: new Date(),
          member: '科学搬砖组',
          href: '',
          memberLink: '',
        },
        {
          id: 'xxx2',
          title: titles[1],
          logo: avatars[1],
          description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
          updatedAt: new Date('2017-07-24'),
          member: '全组都是吴彦祖',
          href: '',
          memberLink: '',
        },
        {
          id: 'xxx3',
          title: titles[2],
          logo: avatars[2],
          description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
          updatedAt: new Date(),
          member: '中二少女团',
          href: '',
          memberLink: '',
        },
        {
          id: 'xxx4',
          title: titles[3],
          logo: avatars[3],
          description: '那时候我只会想自己想要什么，从不想自己拥有什么',
          updatedAt: new Date('2017-07-23'),
          member: '程序员日常',
          href: '',
          memberLink: '',
        },
        {
          id: 'xxx5',
          title: titles[4],
          logo: avatars[4],
          description: '凛冬将至',
          updatedAt: new Date('2017-07-23'),
          member: '高逼格设计天团',
          href: '',
          memberLink: '',
        },
        {
          id: 'xxx6',
          title: titles[5],
          logo: avatars[5],
          description: '生命就像一盒巧克力，结果往往出人意料',
          updatedAt: new Date('2017-07-23'),
          member: '骗你来学计算机',
          href: '',
          memberLink: '',
        },
      ],
      notifyCount: 12,
      unreadCount: 11,
      country: 'China',
      geographic: {
        province: {
          label: '浙江省',
          key: '330000'
        },
        city: {
          label: '杭州市',
          key: '330100'
        }
      },
      address: '西湖区工专路 77 号',
      phone: '0752-268888888'
    },
    // GET POST 可省略
    'GET /api/users': [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }],
    'POST /api/login/account': (req, res) => {
      const {
        password,
        userName,
        type
      } = req.body;

      if (password === 'ant.design' && userName === 'admin') {
        res.send({
          status: 'ok',
          type,
          currentAuthority: 'admin'
        });
        return;
      }

      if (password === 'ant.design' && userName === 'user') {
        res.send({
          status: 'ok',
          type,
          currentAuthority: 'user'
        });
        return;
      }

      res.send({
        status: 'error',
        type,
        currentAuthority: 'guest'
      });
    },
    'POST /api/register': (req, res) => {
      res.send({
        status: 'ok',
        currentAuthority: 'user'
      });
    },
    'GET /api/500': (req, res) => {
      res.status(500).send({
        timestamp: 1513932555104,
        status: 500,
        error: 'error',
        message: 'error',
        path: '/base/category/list'
      });
    },
    'GET /api/404': (req, res) => {
      res.status(404).send({
        timestamp: 1513932643431,
        status: 404,
        error: 'Not Found',
        message: 'No message available',
        path: '/base/category/list/2121212'
      });
    },
    'GET /api/403': (req, res) => {
      res.status(403).send({
        timestamp: 1513932555104,
        status: 403,
        error: 'Unauthorized',
        message: 'Unauthorized',
        path: '/base/category/list'
      });
    },
    'GET /api/401': (req, res) => {
      res.status(401).send({
        timestamp: 1513932555104,
        status: 401,
        error: 'Unauthorized',
        message: 'Unauthorized',
        path: '/base/category/list'
      });
    }
  };

  const data = _objectSpread({}, api, chart, geographic, notices, profile, rule, user$1);

  return data;

}));
