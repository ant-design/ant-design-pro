const beginDay = Date.now();

// Generate visit data
const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
const visitData = fakeY.map((y, i) => ({
  x: new Date(beginDay + 1000 * 60 * 60 * 24 * i).toISOString().split('T')[0],
  y,
}));

const fakeY2 = [1, 6, 4, 8, 3, 7, 2];
const visitData2 = fakeY2.map((y, i) => ({
  x: new Date(beginDay + 1000 * 60 * 60 * 24 * i).toISOString().split('T')[0],
  y,
}));

// Generate sales data
const salesData = Array.from({ length: 12 }, (_, i) => ({
  x: `${i + 1}月`,
  y: Math.floor(Math.random() * 1000) + 200,
}));

// Generate search data
const searchData = Array.from({ length: 50 }, (_, i) => ({
  index: i + 1,
  keyword: `搜索关键词-${i}`,
  count: Math.floor(Math.random() * 1000),
  range: Math.floor(Math.random() * 100),
  status: Math.floor((Math.random() * 10) % 2),
}));

const salesTypeData = [
  { x: '家用电器', y: 4544 },
  { x: '食用酒水', y: 3321 },
  { x: '个护健康', y: 3113 },
  { x: '服饰箱包', y: 2341 },
  { x: '母婴产品', y: 1231 },
  { x: '其他', y: 1231 },
];

const salesTypeDataOnline = [
  { x: '家用电器', y: 244 },
  { x: '食用酒水', y: 321 },
  { x: '个护健康', y: 311 },
  { x: '服饰箱包', y: 41 },
  { x: '母婴产品', y: 121 },
  { x: '其他', y: 111 },
];

const salesTypeDataOffline = [
  { x: '家用电器', y: 99 },
  { x: '食用酒水', y: 188 },
  { x: '个护健康', y: 344 },
  { x: '服饰箱包', y: 255 },
  { x: '其他', y: 65 },
];

const offlineData = Array.from({ length: 10 }, (_, i) => ({
  name: `Stores ${i}`,
  cvr: Math.ceil(Math.random() * 9) / 10,
}));

const offlineChartData = Array.from({ length: 20 }, (_, i) => {
  const date = new Date(Date.now() + 1000 * 60 * 30 * i);
  return {
    date: `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`,
    type: '客流量',
    value: Math.floor(Math.random() * 100) + 10,
  };
}).concat(
  Array.from({ length: 20 }, (_, i) => {
    const date = new Date(Date.now() + 1000 * 60 * 30 * i);
    return {
      date: `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`,
      type: '支付笔数',
      value: Math.floor(Math.random() * 100) + 10,
    };
  }),
);

const radarOriginData = [
  { name: '个人', ref: 10, koubei: 8, output: 4, contribute: 5, hot: 7 },
  { name: '团队', ref: 3, koubei: 9, output: 6, contribute: 3, hot: 1 },
  { name: '部门', ref: 4, koubei: 1, output: 6, contribute: 5, hot: 7 },
];

const radarTitleMap: Record<string, string> = {
  ref: '引用',
  koubei: '口碑',
  output: '产量',
  contribute: '贡献',
  hot: '热度',
};

const radarData = radarOriginData.flatMap((item) =>
  Object.entries(item)
    .filter(([key]) => key !== 'name')
    .map(([key, value]) => ({
      name: item.name,
      label: radarTitleMap[key],
      value,
    })),
);

export const analysisChartData = {
  visitData,
  visitData2,
  salesData,
  searchData,
  offlineData,
  offlineChartData,
  salesTypeData,
  salesTypeDataOnline,
  salesTypeDataOffline,
  radarData,
};

export const projectNotice = [
  {
    id: 'xxx1',
    title: 'Alipay',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    description: '那是一种内在的东西，他们到达不了，也无法触及的',
    updatedAt: new Date().toISOString(),
    member: '科学搬砖组',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx2',
    title: 'Angular',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
    description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
    updatedAt: '2017-07-24',
    member: '全组都是吴彦祖',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx3',
    title: 'Ant Design',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
    description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
    updatedAt: new Date().toISOString(),
    member: '中二少女团',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx4',
    title: 'Ant Design Pro',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
    description: '那时候我只会想自己想要什么，从不想自己拥有什么',
    updatedAt: '2017-07-23',
    member: '程序员日常',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx5',
    title: 'Bootstrap',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
    description: '凛冬将至',
    updatedAt: '2017-07-23',
    member: '高逼格设计天团',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx6',
    title: 'React',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
    description: '生命就像一盒巧克力，结果往往出人意料',
    updatedAt: '2017-07-23',
    member: '骗你来学计算机',
    href: '',
    memberLink: '',
  },
];

const avatars2 = [
  'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
  'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
  'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
];

export const activities = [
  {
    id: 'trend-1',
    updatedAt: new Date().toISOString(),
    user: { name: '曲丽丽', avatar: avatars2[0] },
    group: { name: '高逼格设计天团', link: 'http://github.com/' },
    project: { name: '六月迭代', link: 'http://github.com/' },
    template: '在 @{group} 新建项目 @{project}',
  },
  {
    id: 'trend-2',
    updatedAt: new Date().toISOString(),
    user: { name: '付小小', avatar: avatars2[1] },
    group: { name: '高逼格设计天团', link: 'http://github.com/' },
    project: { name: '六月迭代', link: 'http://github.com/' },
    template: '在 @{group} 新建项目 @{project}',
  },
  {
    id: 'trend-3',
    updatedAt: new Date().toISOString(),
    user: { name: '林东东', avatar: avatars2[2] },
    group: { name: '中二少女团', link: 'http://github.com/' },
    project: { name: '六月迭代', link: 'http://github.com/' },
    template: '在 @{group} 新建项目 @{project}',
  },
  {
    id: 'trend-4',
    updatedAt: new Date().toISOString(),
    user: { name: '周星星', avatar: avatars2[4] },
    project: { name: '5 月日常迭代', link: 'http://github.com/' },
    template: '将 @{project} 更新至已发布状态',
  },
  {
    id: 'trend-5',
    updatedAt: new Date().toISOString(),
    user: { name: '朱偏右', avatar: avatars2[3] },
    project: { name: '工程效能', link: 'http://github.com/' },
    comment: { name: '留言', link: 'http://github.com/' },
    template: '在 @{project} 发布了 @{comment}',
  },
  {
    id: 'trend-6',
    updatedAt: new Date().toISOString(),
    user: { name: '乐哥', avatar: avatars2[5] },
    group: { name: '程序员日常', link: 'http://github.com/' },
    project: { name: '品牌迭代', link: 'http://github.com/' },
    template: '在 @{group} 新建项目 @{project}',
  },
];
