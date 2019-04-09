// import { parse } from 'url';

import constants from '@/utils/constUtil';

const { ACT, API_STATUS } = constants;

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    apiId: i,
    name: `Api Name ${i}`,
    actionName: `queryUser`,
    serviceType: `${Math.floor(Math.random() * 10) % 3 +1}`,
    groupId: (Math.floor(Math.random() * 10) % 4) + 1,
    status: `${Math.floor(Math.random() * 10) % 3}`,
    updateTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createUser: 'Alex',
  });
}
const apiInfoDetail={
  "code": "200",
  "msg": "SUCCESS",
  "data": {
    "apiId": 61,
    "name": "语音识别0319",
    "serviceNo": "ES15529769095510000000061",
    "actionName": "",
    "groupId": 1,
    "securityType": "1",
    "signature": "12121",
    "remark": "aaaa",
    "requestUrl": "//rest//voice",
    "protocol": "HTTP",
    "matchType": null,
    "reqMethod": "2",
    "status": "2",
    "statusName": null,
    "createTime": "2019-03-19T06:28:28.000+0000",
    "createUser": "loginName",
    "updateTime": "2019-03-19T06:28:28.000+0000",
    "updateUser": "loginName",
    "serviceType": "1",
    "serviceTypeName": null,
    "apiServiceMappings": null,
    "apiType":"1",
    "apiServiceBackends": [
      {
        "backendId": 17,
        "apiId": 61,
        "serviceType": "1",
        "protocol": 'HTTP',
        "url": "http://test.com",
        "reqPath": "2",
        "reqMethod": "2",
        "connectTimeout": 30000,
        "callNumber": null,
        "socketTimeout": 20000,
        "trustStore": null,
        "trustStorePassword": null,
        "keyStore": null,
        "keyStorePassword": null,
        "status": "2",
        "createTime": "2019-03-19T06:44:55.000+0000",
        "createUser": null,
        "updateTime": "2019-03-19T06:44:55.000+0000",
        "updateUser": null,
        "backendType": "endpoint",
        "codeMethod": null,
        "serviceSeq": 3,
        "orgId":2,
        apiServiceBackendAttrs:[{
          attrId:1,
          backendId:1,
          attrSpecId:1,
          attrSpecCode:'userName',
          attrValue:'xxx',
        },{
          attrId:1,
          backendId:1,
          attrSpecId:2,
          attrSpecCode:'userPassword',
          attrValue:'xxx',
        },{
          attrId:1,
          backendId:1,
          attrSpecId:3,
          attrSpecCode:'authType',
          attrValue:'basicAuth',
        }],
      },
      {
        backEndId: '1',
        serviceSeq: '1',
        backendType: 'in',
        url: 'com.ai.odc.changeParam',
      },
      {
        backEndId: '2',
        serviceSeq: '2',
        backendType: 'in',
        url: 'http://odc.ai.com/changeParam',
      },
      {
        backEndId: '4',
        serviceSeq: '4',
        backendType: 'out',
        url: 'com.ai.odc.changeParam',
      },
    ],
    apiServiceOrgs:[
      {
        "id":1,
        "apiId":90,
        "appkey":"000001",
        "status":"A"
      }
    ],
  }
}
function apiList(req, res, u, b) {
  const payload = (b && b.body) || req.body;
  let dataSource = tableListDataSource;
  const params = payload && payload.data && payload.data.info ? payload.data.info : {};
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
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.groupId) {
    dataSource = dataSource.filter(data => data.groupId === parseInt(params.groupId, 10));
  }
  if (params.name) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    "code": "200",
    "msg": null,
    "data": {
      records: dataSource,
      page: {
        total: dataSource.length,
        pageSize,
        pageNo: parseInt(params.pageNo, 10) || 1,
      },
    },
  };

  return res.json(result);
}

function saveApi(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;

  const {
    option,
    data: { info },
  } = body;
  const {apiService,apiServiceBackends} = info;
  // console.log("111111111111----------:",option,ACT.UPDATE,option === ACT.UPDATE);
  if (option === ACT.ADD) {
    tableListDataSource.push({...apiService,apiId:tableListDataSource.length});
  } else if (option === ACT.UPDATE) {
    const index = tableListDataSource.findIndex(item => apiService.apiId === item.apiId);
    tableListDataSource.splice(index, 1, apiService);// 对列表模拟数据对更新
    apiInfoDetail.data={...apiInfoDetail.data,...apiService};
    /* apiInfoDetail.data.apiServiceBackends数据对更新 */
    let i = apiInfoDetail.data.apiServiceBackends.length;
    // console.log("111111111111----------:",apiServiceBackends);
    apiInfoDetail.data.apiServiceBackends = apiServiceBackends.map((item) => {
      i += 1;
      const newItem = item.backendId ? item : {...item, backendId: i};// 去掉key，增加backendId
      return newItem;
    });
  }
  // console.log("12--------:",apiInfoDetail.data.apiServiceBackends);
  const result = apiInfoDetail;

  return res.json(result);
}

function apiStatusBatch(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;

  const {
    option,
    data: { info },
  } = body;

  switch (option) {
    /* eslint no-case-declarations:0 */
    case ACT.DEL:
      info.apiIds.forEach(key => {
        tableListDataSource = tableListDataSource.filter(item => key !== item.apiId);
      });
      break;
    case ACT.ONLINE:
      info.apiIds.forEach(key => {
        const apiInfo = tableListDataSource.find(item => key === item.apiId);
        apiInfo.status = API_STATUS.ONLINE;
      });
      break;
    case ACT.OFFLINE:
      info.apiIds.forEach(key => {
        const apiInfo = tableListDataSource.find(item => key === item.apiId);
        apiInfo.status = API_STATUS.CLOSE;
      });
      break;
    default:
      break;
  }

  // const result = {
  //   list: tableListDataSource,
  //   pagination: {
  //     total: tableListDataSource.length,
  //   },
  // };
  //
  // return res.json(result);

  const result = {
    code: 200,
    msg: '',
  };

  return res.json(result);
}

function apiInfoMock(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;

  const {
    data: { info },
  } = body;

  const apiInfo = tableListDataSource.find(item => item.apiId === info.apiId);
  console.log("getApiInfo:",apiInfoDetail.data);
  apiInfoDetail.data={...apiInfoDetail.data,...apiInfo}

  return res.json(apiInfoDetail);
}

export default {
  'POST /baseInfo/apiService/apiList': apiList,
  'POST /baseInfo/apiService/apiBatch': apiStatusBatch,
  'POST /baseInfo/apiService/apiInfo': apiInfoMock,
  'POST /baseInfo/apiService/saveApi': saveApi,

  'POST /conf/forms': (req, res) => {
    res.send({ message: 'Ok' });
  },
};
