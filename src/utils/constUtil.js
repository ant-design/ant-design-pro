const constants = {
  PREFIX_PATH: '/server', // '/server'为后台真实服务器，''为模拟服务
  DEBUG: true,
  GLOBAL_COLLAPSE: true, // true侧边栏默认折叠
  SUCCESS_CODE: '200',
  UNAUTH_CODE: '1203',
  TOKEN_KEY: 'Accept-token',
  PROXY_URL: 'http://10.1.241.42:8090/conf-service/',
  MANAGER_ROLE: ['admin', 'manager'],
  CALL_POINT:'call',
  WS:{
    PATH_PREFIX:'/ws/',
    SERVICE_TYPE:'2',
  },
  REST:{
    PATH_PREFIX:'/rest/',
    SERVICE_TYPE:'1',
  },
  HTTP:{
    PATH_PREFIX:'/http/',
    SERVICE_TYPE:'3',
  },
  ADMIN_ROLE: 'admin',
  ROLE_TYPE_KEY: 'roleType',
  API_STATE_KEY: 'apiState',
  COMMON_STATE_KEY: 'commonState',
  ITEM_CODE: 'itemCode',
  ITEM_VALUE: 'itemValue',
  ROLE: 'role',
  TOKEN_PREFIX: 'Bearer ',
  ACT:{
    ADD: 1,
    UPDATE: 2,
    DEL: 3,
    ONLINE: 4,
    OFFLINE: 5,
    API_DOC: 9,
  },
  API_STATUS:{
    CLOSE: '0',
    OFFLINE: '1',
    ONLINE: '2',
    REMOVE: '1X',
  },
  STATUS:{
    A: 'A',
    S: 'S',
    D: 'D',
  },
};


export default constants;
