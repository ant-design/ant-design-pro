const constants = {
  PREFIX_PATH: '／server',
  DEBUG: true,
  SUCCESS_CODE: '200',
  UNAUTH_CODE: '1203',
  TOKEN_KEY: 'Accept-token',
  PROXY_URL: 'http://10.1.241.42:8090/conf-service/',
  MANAGER_ROLE: ['admin', 'manager'],
  ADMIN_ROLE: 'admin',
  ROLE_TYPE_KEY: 'roleType',
  API_STATE_KEY: 'apiState',
  COMMON_STATE_KEY: 'commonState',
  ITEM_CODE: 'itemCode',
  ITEM_VALUE: 'itemValue',
  ROLE: 'role',
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
  },
  STATUS:{
    A: 'A',
    S: 'S',
    D: 'D',
  },
};


export default constants;
