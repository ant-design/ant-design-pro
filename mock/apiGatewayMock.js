// import { parse } from 'url';

import constants from './constUtil';

const { ACT, API_STATUS,STATUS } = constants;
const reqMethodAtt=['get','post'];
// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    apiId: i,
    name: `Api Name ${i}`,
    actionName: `queryUser`,
    requestUrl:'/rest/query',
    serviceType: `${Math.floor(Math.random() * 10) % 3 +1}`,
    groupId: (Math.floor(Math.random() * 10) % 4) + 1,
    status: `${Math.floor(Math.random() * 10) % 3}`,
    reqMethod:reqMethodAtt[i%2],
    updateTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createUser: 'Alex',
  });
}
const urlSample="/rest/{tableName}/voice/{id}";
const urlSpecAttr="[{\"name\":\"tableName\",\"type\":\"string\",\"remark\":\"table name\",\"parent\":\"-\"},{\"name\":\"id\",\"type\":\"string\",\"remark\":\"id\",\"parent\":\"-\"}]";
const headerSampleArr="[{\"key\":\"appkey\",\"value\":\"xxxx\"}]";
const headerSpecArr="[{\"name\":\"appkey\",\"type\":\"string\",\"remark\":\"app key\",\"parent\":\"-\"}]";
const bodySampleArr="{\"type\":1,\"name\":\"asia info\",\"rela\":{\"orgId\":1,\"orgName\":\"asia intl\"}}";
const bodySpecArr="[{\"name\":\"type\",\"type\":\"integer\",\"remark\":\"type for query\",\"parent\":\"root\"},{\"name\":\"name\",\"type\":\"string\",\"remark\":\"name for query\",\"parent\":\"root\"}]";
const stateCodeSpecArr="[{\"name\":\"200\",\"type\":\"string\",\"remark\":\"success\",\"parent\":\"-\"},{\"name\":\"401\",\"type\":\"string\",\"remark\":\"用户没有权限（令牌、用户名、密码错误）。\",\"parent\":\"-\"}]";
const busiCodeSpecArr="[{\"name\":\"200\",\"type\":\"string\",\"remark\":\"success\",\"parent\":\"-\"},{\"name\":\"999\",\"type\":\"string\",\"remark\":\"System Exception。\",\"parent\":\"-\"}]";

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
    "requestUrl": "/rest/{tableName}/voice/{id}",
    "protocol": "HTTP",
    "matchType": null,
    "reqMethod": "get",
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
        "reqMethod": "post",
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
        backendId: '1',
        serviceSeq: '1',
        backendType: 'in',
        adapterSpecId:1,
        adapterSpecName:'ootb_adapter_in',
        url: 'com.ai.odc.changeParam',
        "adapterAttrs": [
          {
            "attrId": 117,
            "backendId": 1,
            "attrSpecId": "1",
            "attrValue": "1234",
            "attrSpecCode": "busi_code"
          },
          {
            "attrId": 118,
            "backendId": 1,
            "attrSpecId": "2",
            "attrValue": "queryUser",
            "attrSpecCode": "operationCode"
          },
        ]
      },
      {
        backendId: '2',
        serviceSeq: '2',
        backendType: 'in',
        adapterSpecId:2,
        adapterSpecName:'token_adapter_in',
        url: 'http://odc.ai.com/changeParam',
        "adapterAttrs": [
          {
            "attrId": 119,
            "backendId": 2,
            "attrSpecId": "3",
            "attrValue": "Beria 123234324324324324",
            "attrSpecCode": "token",
          },
        ]
      },
      {
        backendId: '4',
        serviceSeq: '4',
        backendType: 'out',
        url: 'com.ai.odc.changeParam',
      },
    ],
    "apiServiceOrgs":[
      {
        "id":1,
        "apiId":90,
        "appkey":"000001",
        "status":STATUS.A
      }
    ],
    "apiServiceDoc":{
      apiServiceDocId: 1,
      apiId:1,
      urlSample,
      urlSpec:urlSpecAttr,
      requestHeaderSample: headerSampleArr,
      requestHeaderSpec: headerSpecArr,
      requestBodySample: bodySampleArr,
      requestBodySpec: bodySpecArr,
      responseHeaderSample: headerSampleArr,
      responseHeaderSpec: headerSpecArr,
      responseBodySample: bodySampleArr,
      responseBodySpec: bodySpecArr,
      stateCodeSpec: stateCodeSpecArr,
      busiCodeSpec: busiCodeSpecArr,
    },
  }
};

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
  const {apiService} = info;
  // console.log("111111111111----------:",option,ACT.UPDATE,option === ACT.UPDATE);
  if (option === ACT.ADD) {
    apiService.apiServiceBackends[0].backendId=tableListDataSource.length;
    apiInfoDetail.data={...apiService,apiId:tableListDataSource.length};
    tableListDataSource.push(apiInfoDetail.data);
  }
  else if (option === ACT.UPDATE) {
    const index = tableListDataSource.findIndex(item => apiService.apiId === item.apiId);
    tableListDataSource.splice(index, 1, apiService);// 对列表模拟数据对更新
    apiInfoDetail.data={...apiInfoDetail.data,...apiService};
    /* apiInfoDetail.data.apiServiceBackends数据对更新 */
    let i = apiInfoDetail.data.apiServiceBackends.length;
    // console.log("111111111111----------:",apiServiceBackends);
    apiInfoDetail.data.apiServiceBackends = apiService.apiServiceBackends.map((item) => {
      i += 1;
      const newItem = item.backendId ? item : {...item, backendId: i};// 增加backendId
      return newItem;
    });
  }
  else if (option === ACT.API_DOC) {
    const index = tableListDataSource.findIndex(item => apiService.apiId === item.apiId);
    tableListDataSource.splice(index, 1, apiService);// 对列表模拟数据对更新
    apiInfoDetail.data={...apiInfoDetail.data,...apiService};
    apiInfoDetail.data.apiServiceDoc.apiServiceDocId=23;
    apiInfoDetail.data.apiServiceDoc.apiId=apiService.apiId;
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
    code: '200',
    msg: 'success',
  };

  return res.json(result);
}

function apiInfoMock(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  // console.log("==========:",req);
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
};
