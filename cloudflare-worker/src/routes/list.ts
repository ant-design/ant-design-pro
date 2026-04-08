import { Hono } from 'hono';

const titles = [
  'Alipay',
  'Angular',
  'Ant Design',
  'Ant Design Pro',
  'Bootstrap',
  'React',
  'Vue',
  'Webpack',
];

const avatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
  'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
  'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
  'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
  'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
  'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png',
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png',
];

const covers = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];

const desc = [
  '那是一种内在的东西， 他们到达不了，也无法触及的',
  '希望是一个好东西，也许是最好的，好东西是不会消亡的',
  '生命就像一盒巧克力，结果往往出人意料',
  '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
  '那时候我只会想自己想要什么，从不想自己拥有什么',
];

const user = [
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

function fakeList(count: number) {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      owner: user[i % 10],
      title: titles[i % 8],
      avatar: avatars[i % 8],
      cover:
        parseInt(`${i / 4}`, 10) % 2 === 0
          ? covers[i % 4]
          : covers[3 - (i % 4)],
      status: ['active', 'exception', 'normal'][i % 3] as
        | 'normal'
        | 'exception'
        | 'active'
        | 'success',
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i % 8],
      href: 'https://ant.design',
      updatedAt: new Date().getTime() - Math.floor(Math.random() * 1000000000),
      createdAt: new Date().getTime() - Math.floor(Math.random() * 1000000000),
      subDescription: desc[i % 5],
      description:
        '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的共通点和组成部分，该专案即是致力于归纳和吸收各种产品的各自优势，致力于打造成中后台产品的根底',
      activeUser: Math.floor(Math.random() * 10000) + 1000,
      newUser: Math.floor(Math.random() * 1000) + 100,
      star: Math.floor(Math.random() * 100) + 10,
      like: Math.floor(Math.random() * 100) + 10,
      message: Math.floor(Math.random() * 100) + 10,
      content:
        '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
      members: [
        {
          avatar:
            'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
          name: '曲丽丽',
          id: 'member1',
        },
        {
          avatar:
            'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
          name: '王昭君',
          id: 'member2',
        },
        {
          avatar:
            'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
          name: '董娜娜',
          id: 'member3',
        },
      ],
    });
  }
  return list;
}

let sourceData: ReturnType<typeof fakeList> = [];

const app = new Hono();

// GET /api/get_list
app.get('/get_list', (c) => {
  const count = Number(c.req.query('count')) || 20;
  const result = fakeList(count);
  sourceData = result;
  return c.json({
    data: {
      list: result,
    },
  });
});

// POST /api/post_fake_list
app.post('/post_fake_list', async (c) => {
  const body = await c.req.json();
  const { method, id } = body;
  let result = sourceData || [];

  switch (method) {
    case 'delete':
      result = result.filter((item: (typeof result)[0]) => item.id !== id);
      break;
    case 'update':
      result = result.map((item: (typeof result)[0]) =>
        item.id === id ? { ...item, ...body } : item,
      );
      break;
    case 'post':
      result.unshift({
        ...body,
        id: `fake-list-${result.length}`,
        createdAt: Date.now(),
      });
      break;
    default:
      break;
  }

  return c.json({
    data: {
      list: result,
    },
  });
});

// GET /api/card_fake_list
app.get('/card_fake_list', (c) => {
  const count = Number(c.req.query('count')) || 20;
  const result = fakeList(count);
  return c.json({
    data: {
      list: result,
    },
  });
});

// GET /api/tags
app.get('/tags', (c) => {
  const list = [];
  for (let i = 0; i < 100; i++) {
    list.push({
      name: ['城市', '省份', '区划'][Math.floor(Math.random() * 3)] + i,
      value: Math.floor(Math.random() * 100) + 1,
      type: Math.floor(Math.random() * 3),
    });
  }
  return c.json({
    data: { list },
  });
});

// GET /api/fake_list_Detail
app.get('/fake_list_Detail', (c) => {
  const count = Number(c.req.query('count')) || 5;
  const result = fakeList(count);
  return c.json({
    data: {
      list: result,
    },
  });
});

// GET /api/currentUserDetail
app.get('/currentUserDetail', (c) => {
  return c.json({
    data: {
      name: 'Serati Ma',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
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
    },
  });
});

export default app;
