const data = {
  data: {
    current: 1,
    data: [
      {
        account: 'G',
        id: '010c5032b86a4b47ae2b5c1753eb39f2',
        locked: false,
        name: 'G',
        nickName: 'G',
      },
      {
        account: 'A',
        id: '2e3df89a0ecb4b5ca5883cdab278d364',
        locked: false,
        name: 'A',
      },
      {
        account: 'C',
        id: '3aa43b60b3ed4a7aa6c66657ea6b0c77',
        locked: false,
        name: 'C',
      },
      {
        account: 'c',
        id: '4',
        locked: false,
        name: 'c',
      },
      {
        account: 'H',
        id: '469229421e1349b3a786ddefe7858769',
        locked: false,
        name: 'HCS',
        nickName: 'H',
      },
      {
        account: 'pkaq@msn.com',
        code: 'Testr',
        deptId: '4',
        email: 'w-sky@msn.com',
        id: '4e51e4cb519f4df29c39bae540607362',
        locked: true,
        name: 'Frank Wu LQHB',
        nickName: '24',
        tel: '1',
      },
      {
        account: 'N',
        deptId: '1',
        id: '6098fa4beda44c6baea5048709ccb64c',
        locked: false,
        name: 'N',
      },
      {
        account: 'F',
        id: '7cf7fa15bd504fc4a7e3b3d2d05042d1',
        locked: false,
        name: 'F',
        nickName: 'F',
      },
      {
        account: 'admin',
        code: 'Testr',
        email: 'test@test.com',
        id: '91c83ffb45564edfa7e7eb5edf1cdc5a',
        locked: false,
        name: 'Frank Wu LQHB',
        nickName: '24',
        tel: '2',
      },
      {
        code: 'T',
        id: 'a5527916d2f24d6d87fc00fd1ca54414',
        locked: false,
        name: '协议商品清单',
      },
    ],
    pages: 2,
    size: 10,
    total: 13,
  },
  status: 200,
  statusText: '操作成功',
  success: true,
};

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
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
  'GET /api/listAccount': (req, res) => {
    res.send(data);
  }
};
