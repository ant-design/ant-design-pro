import { imgMap, getUrlParams } from './utils';

export function fakeList(count) {
  const titles = [
    'Vue',
    'AntDesignPro',
    'DesignLab',
    'Angular',
    'AntDesign',
    'React',
    'Alipay',
    'AntDesignMobile',
  ];
  const avatars = [
    'https://gw.alipayobjects.com/zos/rmsportal/hYjIZrUoBfNxOAYBVDfc.png', // 凤蝶
    'https://gw.alipayobjects.com/zos/rmsportal/HHWPIzPLCLYmVuPivyiA.png', // 云雀
    'https://gw.alipayobjects.com/zos/rmsportal/irqByKtOdKfDojxIWTXF.png', // Basement
    'https://gw.alipayobjects.com/zos/rmsportal/VcmdbCBcwPTGYgbYeMzX.png', // DesignLab
  ];
  const covers = [
    'https://gw.alipayobjects.com/zos/rmsportal/nQIAJyTLNeVJfUpTskWk.png',
    'https://gw.alipayobjects.com/zos/rmsportal/pnhtvpOTzypPvmHVrfKN.png',
    'https://gw.alipayobjects.com/zos/rmsportal/SVrKVZEFDnhDTNpkplZj.png',
    'https://gw.alipayobjects.com/zos/rmsportal/bUIOUkPTHgfGdDhgsAgE.png',
  ];

  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      owner: '曲丽丽',
      title: titles[i % 8],
      avatar: avatars[i % 4],
      cover: covers[i % 4],
      status: ['active', 'exception', 'normal'][i % 3],
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: ['https://gw.alipayobjects.com/zos/rmsportal/KoJjkdbuTFxzJmmjuDVR.png', 'https://gw.alipayobjects.com/zos/rmsportal/UxGORCvEXJEsxOfEKZiA.png'][i % 2],
      href: 'https://ant.design',
      updatedAt: new Date(new Date().getTime() - (1000 * 60 * 60 * 2 * i)),
      createdAt: new Date(new Date().getTime() - (1000 * 60 * 60 * 2 * i)),
      subDescription: '一句话描述一句话描述',
      description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
      activeUser: Math.ceil(Math.random() * 100000) + 100000,
      newUser: Math.ceil(Math.random() * 1000) + 1000,
      star: Math.ceil(Math.random() * 100) + 100,
      like: Math.ceil(Math.random() * 100) + 100,
      message: Math.ceil(Math.random() * 10) + 10,
      content: '段落示意：蚂蚁金服设计平台 design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
      members: [
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
          name: '曲丽丽',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
          name: '王昭君',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
          name: '董娜娜',
        },
      ],
    });
  }

  return list;
}

export function getFakeList(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = getUrlParams(url);

  const count = (params.count * 1) || 20;

  const result = fakeList(count);

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export const getNotice = [
  {
    id: 'xxx1',
    title: '消息列表体验优化',
    logo: imgMap.b,
    description: '这是一条描述信息这是一条描述信息',
    updatedAt: new Date(),
    member: '蜂鸟项目组',
  },
  {
    id: 'xxx2',
    title: 'XX 平台',
    logo: imgMap.c,
    description: '这是一条描述信息',
    updatedAt: new Date('2017-07-24 11:00:00'),
    member: '凤蝶精英小分队',
  },
  {
    id: 'xxx3',
    title: '消息列表体验优化',
    logo: imgMap.a,
    description: '这是一条描述信息这是一条描述信息',
    updatedAt: new Date(),
    member: '蜂鸟项目组',
  },
  {
    id: 'xxx4',
    title: '文档中心1',
    logo: imgMap.a,
    description: '这是一条描述信息这是一条描述信息',
    updatedAt: new Date('2017-07-23 06:23:00'),
    member: '成都超级小分队',
  },
  {
    id: 'xxx5',
    title: '文档中心2',
    logo: imgMap.b,
    description: '这是一条描述信息这是一条描述信息',
    updatedAt: new Date('2017-07-23 06:23:00'),
    member: '成都超级小分队',
  },
  {
    id: 'xxx6',
    title: '智能运营中心',
    logo: imgMap.c,
    description: '这是一条描述信息这是一条描述信息',
    updatedAt: new Date('2017-07-23 06:23:00'),
    member: '成都小分队',
  },
];

export const getActivities = [
  {
    id: 'trend-1',
    updatedAt: new Date(),
    user: {
      name: '林东东',
      avatar: imgMap.a,
    },
    action: '在 [凤蝶精英小分队](http://github.com/) 新建项目 [六月迭代](http://github.com/)',
  },
  {
    id: 'trend-2',
    updatedAt: new Date(),
    user: {
      name: '林嘻嘻',
      avatar: imgMap.c,
    },
    action: '在 [凤蝶精英小分队](http://github.com/) 新建项目 [六月迭代](http://github.com/)',
  },
  {
    id: 'trend-3',
    updatedAt: new Date(),
    user: {
      name: '林囡囡',
      avatar: imgMap.b,
    },
    action: '在 [凤蝶精英小分队](http://github.com/) 新建项目 [六月迭代](http://github.com/)',
  },
  {
    id: 'trend-4',
    updatedAt: new Date(),
    user: {
      name: '林贝贝',
      avatar: imgMap.c,
    },
    action: '在 [5 月日常迭代](http://github.com/) 更新至已发布状态',
  },
  {
    id: 'trend-5',
    updatedAt: new Date(),
    user: {
      name: '林忠忠',
      avatar: imgMap.a,
    },
    action: '在 [工程效能](http://github.com/) 发布了 [留言](http://github.com/)',
  },
  {
    id: 'trend-6',
    updatedAt: new Date(),
    user: {
      name: '林呜呜',
      avatar: imgMap.d,
    },
    action: '在 [云雀](http://github.com/) 新建项目 [品牌迭代](http://github.com/)',
  },
];


export default {
  getNotice,
  getActivities,
  getFakeList,
};
