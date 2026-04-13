export const titles = [
  'Alipay',
  'Angular',
  'Ant Design',
  'Ant Design Pro',
  'Bootstrap',
  'React',
  'Vue',
  'Webpack',
];

export const avatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
  'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
  'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
  'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
  'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
  'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png',
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png',
];

export const covers = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];

export const desc = [
  '那是一种内在的东西， 他们到达不了，也无法触及的',
  '希望是一个好东西，也许是最好的，好东西是不会消亡的',
  '生命就像一盒巧克力，结果往往出人意料',
  '城镇中有那么多酒馆，她却偏偏走进了我的酒馆',
  '那时候我只会想自己想要什么，从不想自己拥有什么',
];

export const user = [
  '付小小',
  '曲丽丽',
  '林东东',
  '周星星',
  '吴加好',
  '朱偏右',
  '鱼酱',
  '乐哥',
  '谭小仪',
  '仲尼',
];

export const members = [
  {
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
    name: '曲丽丽',
    id: 'member1',
  },
  {
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
    name: '王昭君',
    id: 'member2',
  },
  {
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
    name: '董娜娜',
    id: 'member3',
  },
];

export const defaultUser = {
  name: 'Serati Ma',
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  userid: '00000001',
  email: 'antdesign@alipay.com',
  signature: '海纳百川，有容乃大',
  title: '交互专家',
  group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
  tags: [
    { key: '0', label: '很有想法的' },
    { key: '1', label: '专注设计' },
    { key: '2', label: '辣~' },
    { key: '3', label: '大长腿' },
    { key: '4', label: '川妹子' },
    { key: '5', label: '海纳百川' },
  ],
  notifyCount: 12,
  unreadCount: 11,
  country: 'China',
  geographic: {
    province: { label: '浙江省', key: '330000' },
    city: { label: '杭州市', key: '330100' },
  },
  address: '西湖区工专路 77 号',
  phone: '0752-268888888',
};

const statuses = ['active', 'exception', 'normal'];

export function fakeList(count: number) {
  const safeCount = Number.isFinite(count) && count >= 0 ? Math.floor(count) : 0;
  const list = [];
  for (let i = 0; i < safeCount; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      owner: user[i % user.length],
      title: titles[i % titles.length],
      avatar: avatars[i % avatars.length],
      cover: Math.floor(i / covers.length) % 2 === 0 ? covers[i % covers.length] : covers[covers.length - 1 - (i % covers.length)],
      status: statuses[i % statuses.length],
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i % avatars.length],
      href: 'https://ant.design',
      updatedAt: Date.now() - Math.floor(Math.random() * 1000000000),
      createdAt: Date.now() - Math.floor(Math.random() * 1000000000),
      subDescription: desc[i % desc.length],
      description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的共通点和组成部分，该专案即是致力于归纳和吸收各种产品的各自优势，致力于打造成中后台产品的根底',
      activeUser: Math.floor(Math.random() * 10000) + 1000,
      newUser: Math.floor(Math.random() * 1000) + 100,
      star: Math.floor(Math.random() * 100) + 10,
      like: Math.floor(Math.random() * 100) + 10,
      message: Math.floor(Math.random() * 100) + 10,
      content: '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
      members,
    });
  }
  return list;
}