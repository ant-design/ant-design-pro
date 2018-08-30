// 树形数据
const data = {
  "data":{
    "current":1,
    "data":[
      {
        "code":"XTGL",
        "id":"1",
        "locked":false,
        "name":"系统管理员"
      },
      {
        "code":"PZGL",
        "id":"2",
        "locked":false,
        "name":"配置管理员"
      },
      {
        "code":"CKGL",
        "id":"3",
        "locked":false,
        "name":"仓库管理员"
      }
    ],
    "pages":1,
    "size":10,
    "total":3
  },
  "status":200,
  "statusText":"操作成功",
  "success":true
};

const module = {
  "data":{
    "checked":["6","10","5","8","7","11"],
    "modules":[
      {
        "children":[
          {
            "icon":"flag",
            "id":"6",
            "isleaf":true,
            "name":"组织管理",
            "parentId":"5",
            "parentName":"系统管理",
            "path":"organization",
            "pathId":"5",
            "status":"0001"
          },
          {
            "icon":"bars",
            "id":"7",
            "isleaf":true,
            "name":"模块管理",
            "parentId":"5",
            "parentName":"系统管理",
            "path":"module",
            "pathId":"5",
            "status":"0001"
          },
          {
            "icon":"usergroup-add",
            "id":"8",
            "isleaf":true,
            "name":"用户管理",
            "parentId":"5",
            "parentName":"系统管理",
            "path":"account",
            "pathId":"5",
            "status":"0001"
          },
          {
            "icon":"form",
            "id":"9",
            "isleaf":true,
            "name":"权限管理",
            "parentId":"5",
            "parentName":"系统管理",
            "path":"role",
            "pathId":"5",
            "status":"0001"
          },
          {
            "icon":"profile",
            "id":"10",
            "isleaf":true,
            "name":"字典管理",
            "parentId":"5",
            "parentName":"系统管理",
            "path":"dictionary",
            "pathId":"5",
            "status":"0001"
          }
        ],
        "icon":"setting",
        "id":"5",
        "isleaf":false,
        "name":"系统管理",
        "orders":2,
        "path":"sys",
        "pathId":"0",
        "status":"0001"
      },
    ]
  },
  "status":200,
  "statusText":"操作成功",
  "success":true
};

const configData = [{
  id: 1,
  code: 'sysconfig',
  keyName: '身份识别认证',
  keyValue: '0002',
  desc: '这是描述',
  checked: true,
  order: 1,
}, {
  id: 2,
  code: 'sysconfig',
  keyName: '数据后台同步',
  keyValue: '0003',
  desc: '这是描述',
  checked: false,
  order: 2,
}, {
  id: 3,
  code: 'sysconfig',
  keyName: 'Tab方式新增/编辑',
  keyValue: '0001',
  desc: '这是描述',
  checked: true,
  order: 3,
},];

const users = {
  "data":{
    "checked":[
      "010c5032b86a4b47ae2b5c1753eb39f2",
      "4e51e4cb519f4df29c39bae540607362",
      "4",
      "469229421e1349b3a786ddefe7858769"
    ],
    "users":{
      "current":1,
      "data":[
        {
          "account":"G",
          "id":"010c5032b86a4b47ae2b5c1753eb39f2",
          "locked":false,
          "name":"G",
          "nickName":"G"
        },
        {
          "account":"A",
          "id":"2e3df89a0ecb4b5ca5883cdab278d364",
          "locked":false,
          "name":"A"
        },
        {
          "account":"C",
          "id":"3aa43b60b3ed4a7aa6c66657ea6b0c77",
          "locked":false,
          "name":"C"
        },
        {
          "account":"c",
          "id":"4",
          "locked":false,
          "name":"c"
        },
        {
          "account":"H",
          "id":"469229421e1349b3a786ddefe7858769",
          "locked":false,
          "name":"HCS",
          "nickName":"H"
        },
        {
          "account":"N",
          "deptId":"1",
          "id":"6098fa4beda44c6baea5048709ccb64c",
          "locked":false,
          "name":"N"
        },
        {
          "account":"F",
          "id":"7cf7fa15bd504fc4a7e3b3d2d05042d1",
          "locked":false,
          "name":"F",
          "nickName":"F"
        },
        {
          "account":"admin",
          "code":"Testr",
          "email":"test@test.com",
          "id":"91c83ffb45564edfa7e7eb5edf1cdc5a",
          "locked":false,
          "name":"Frank Wu LQHB",
          "nickName":"24",
          "tel":"2"
        },
        {
          "code":"T",
          "id":"a5527916d2f24d6d87fc00fd1ca54414",
          "locked":false,
          "name":"协议商品清单"
        },
        {
          "account":"B",
          "id":"ce62a7bccd004b1aaf6b3c7c81912375",
          "locked":false,
          "name":"B"
        }
      ],
      "pages":2,
      "size":10,
      "total":12
    }
  },
  "status":200,
  "statusText":"操作成功",
  "success":true
};

// 获取权限列表数据
export function listRole(req, res) {
  const dataSource = data;
  if (res && res.json) {
    res.json(dataSource);
  } else {
    return dataSource;
  }
}

// 根据权限组获取绑定的模块数据
export function listModule(req, res) {
  const dataSource = module;
  if (res && res.json) {
    res.json(dataSource);
  } else {
    return dataSource;
  }
}
// 获取用户列表
export function listUser(req, res) {
  const dataSource = users;
  if (res && res.json) {
    res.json(dataSource);
  } else {
    return dataSource;
  }
}
// 获取字典项数据
export function getDictItemByRoleId(req, res) {
  if (res && res.json) {
    res.json(configData);
  } else {
    return configData;
  }
}

export default {
  'GET /api/role/list': listRole,
  'GET /api/role/listUser': listUser,
  'GET /api/role/listModule': listModule,
  'GET /api/role/getDictItemByRoleId': getDictItemByRoleId,
};

