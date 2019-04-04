/* eslint-disable eqeqeq */
import {parse} from 'url';

// mock tableListDataSource
const componentDataSource = [];


const groups =
  {
    "code": "200",
    "msg": null,
    "data": [
      {
        "groupId": 1,
        "groupName": "语音识别",
        "groupDesc": "分组1",
        "groupApiDoc": "空",
        "status": null
      },
      {
        "groupId": 2,
        "groupName": "OCR识别",
        "groupDesc": "aaaaa",
        "groupApiDoc": "bbbbbb",
        "status": null
      },
      {
        "groupId": 5,
        "groupName": "身份识别",
        "groupDesc": "aaaaa1",
        "groupApiDoc": "bbbbbb1",
        "status": null
      },
      {
        "groupId": 6,
        "groupName": "文本识别",
        "groupDesc": null,
        "groupApiDoc": null,
        "status": null
      }
    ]
  };
const orgs={
  "code": "200",
  "msg": null,
  "data": [
    {
      "orgType": "1",
      "password": "StudySC",
      "orgName": "crm",
      "tokenExpireTime": 1800,
      "createTime": "2019-04-02T01:27:14.000+0000",
      "orgCode": "1000001",
      "appkey": "000001",
      "id": 1,
      "authType": 1,
      "status": "D"
    },
    {
      "orgType": "2",
      "orgName": "billing",
      "createTime": "2019-04-02T01:27:17.000+0000",
      "orgCode": "1000002",
      "appkey": "000002",
      "id": 2,
      "status": "D"
    },
    {
      "orgType": "2",
      "orgName": "ose",
      "createTime": "2019-04-02T01:27:21.000+0000",
      "orgCode": "test21111",
      "appkey": "000003",
      "id": 3,
      "status": "D"
    },
    {
      "orgType": "0",
      "orgName": "baidu",
      "createTime": "2019-04-02T01:27:30.000+0000",
      "orgCode": "abc",
      "appkey": "000004",
      "id": 4,
      "status": "D"
    },
    {
      "orgType": "2",
      "orgName": "facebook",
      "createTime": "2019-04-02T01:27:38.000+0000",
      "orgCode": "test2",
      "appkey": "000005",
      "id": 5,
      "status": "D"
    },
    {
      "orgType": "0",
      "orgName": "tdc",
      "createTime": "2019-04-02T01:27:45.000+0000",
      "orgCode": "test2",
      "appkey": "000006",
      "id": 7,
      "status": "D"
    },
    {
      "orgType": "1",
      "orgName": "telenor",
      "createTime": "2019-04-02T01:27:48.000+0000",
      "orgCode": "test2",
      "appkey": "000007",
      "id": 8,
      "status": "D"
    },
    {
      "orgType": "2",
      "orgName": "sp",
      "createTime": "2019-04-02T01:27:51.000+0000",
      "orgCode": "test2",
      "appkey": "000008",
      "id": 9,
      "status": "D"
    },
    {
      "orgType": "1",
      "orgName": "ant",
      "createTime": "2019-04-02T01:27:57.000+0000",
      "orgCode": "test111",
      "appkey": "000009",
      "id": 10,
      "status": "D"
    },
    {
      "orgType": "2",
      "orgName": "taobao",
      "createTime": "2019-04-02T01:28:00.000+0000",
      "orgCode": "2",
      "appkey": "000010",
      "id": 11,
      "status": "A"
    },
    {
      "orgType": "1",
      "orgName": "jingdong",
      "createTime": "2019-04-02T01:28:04.000+0000",
      "orgCode": "abc",
      "appkey": "000011",
      "id": 12,
      "status": "A"
    },
    {
      "orgType": "2",
      "orgName": "dog",
      "createTime": "2019-04-02T01:28:10.000+0000",
      "orgCode": "test2",
      "appkey": "000012",
      "id": 13,
      "status": "A"
    },
    {
      "orgType": "1",
      "orgName": "och",
      "createTime": "2019-04-02T01:28:38.000+0000",
      "orgCode": "test2",
      "appkey": "000013",
      "id": 14,
      "status": "A"
    },
    {
      "orgType": "2",
      "orgName": "tiger",
      "createTime": "2019-04-02T01:28:22.000+0000",
      "orgCode": "bbbbbb2_3",
      "appkey": "000014",
      "id": 15,
      "status": "A"
    },
    {
      "orgType": "1",
      "orgName": "stp",
      "createTime": "2019-04-02T01:28:47.000+0000",
      "orgCode": "test2",
      "appkey": "000015",
      "id": 16,
      "status": "A"
    }
  ]
};
const tableListDataSource = orgs.data;
const groupsDataSource = groups.data;

function pushComponent() {
  componentDataSource.push({
    componentId: 919101,
    disabled: false,
    code: `919101`,
    name: `letsgoComponent`,
    orgId: `9191`,
    orgName: `letsgoOrg`,
    stateTime: new Date(`2017-07-23 14:23:12`),
  });
  componentDataSource.push({
    componentId: 919102,
    disabled: false,
    code: `919102`,
    name: `tdcComponent`,
    orgId: `9192`,
    orgName: `TDC`,
    stateTime: new Date(`2017-07-23 14:23:12`),
  });
  for (let i = 70000; i < 70046; i += 1) {
    componentDataSource.push({
      componentId: i,
      disabled: i % 6 === 0,
      code: `${i}`,
      name: `component ${i}`,
      id: `${i}`,
      orgName: `org ${i}`,
      stateTime: new Date(`2017-07-${Math.floor((i - 70000) / 2) + 1}`),
    });
  }
}
pushComponent();

function getList(innerTableName) {
  let dataSource = tableListDataSource;
  switch (innerTableName) {
    /* eslint no-case-declarations:0 */
    case 'groups':
      dataSource = groupsDataSource;
      break;
    case 'component':
      dataSource = componentDataSource;
      break;
    default:
      break;
  }
  return dataSource;
}

export function sug(req, res, u) {
  console.log('pushOrg');
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;
  let dataSource = getList(params.t);

  console.log(url, params, dataSource.length);
  let no = 'code';
  const title = 'name';
  if (params.t === 'org') {
    no = 'orgCode';
  }
  console.log('no:', no, title);
  if (params.q) {
    dataSource = dataSource.filter(data => `${data[no]}:${data[title]}`.indexOf(params.q) > -1);
  }
  if (params.title) {
    dataSource = dataSource.filter(data => data[title].indexOf(params.title) > -1);
  }

  const result = {
    list: dataSource,
  };
  if (res && res.json) {
    return res.json(result);
  }
  return result;
}
export function queryList(req, res, u, b) {
  // let url = u;
  // if (!url || Object.prototype.toString.call(url) !== '[object String]') {
  //   url = req.url; // eslint-disable-line
  // }

  const params = (b && b.body) || req.body;
  const{tableName,data:{info}} =params;
  // const params = parse(url, true).query;

  let dataSource = [...getList(tableName)];
  // console.debug(url, params, dataSource.length);
  if (info.sorter) {
    const s = info.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }
  // if (params.status) {
  //   const status = params.status.split(',');
  //   let filterDataSource = [];
  //   status.forEach(s => {
  //     filterDataSource = filterDataSource.concat(
  //       [...dataSource].filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
  //     );
  //   });
  //   dataSource = filterDataSource;
  // }
  const keys = Object.keys(info); // 根据查询条件（form表单）的参数，过滤列表
  keys.forEach(key => {
    if (params[key]) {
      dataSource = dataSource.filter(data => {
        const value = data[key];
        if (value) {
          return value.indexOf(params[key]) > -1;
        }

        return true;
      });
    }
  });

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    "code": "200",
    "msg": null,
    "data": {
      "records": dataSource,
      pagination: {
        total: dataSource.length,
        pageSize,
        current: parseInt(params.currentPage, 10) || 1,
      },
    },
  };
  if (res && res.json) {
    return res.json(result);
  }
  return result;
}
export function save(req, res, u, b) {
  // let url = u;
  // if (!url || Object.prototype.toString.call(url) !== '[object String]') {
  //   url = req.url; // eslint-disable-line
  // }

  const body = (b && b.body) || req.body;
  const { method, tableName, data:{info} } = body;
  const {  orgType, orgName, id, componentId, name,appKey, groupId } = info;
  console.log('save in mock:', body, id);
  const datasource = getList(tableName);
  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'post':
      switch (tableName) {
        case 'org':
          const tmpOrgArray = datasource.filter(item => id && id === item.id);
          if (tmpOrgArray && tmpOrgArray.length > 0) {
            const tmpObj = tmpOrgArray.shift();
            tmpObj.orgName = orgName;
            tmpObj.appKey = appKey;
            tmpObj.orgType = orgType;
            tmpObj.status='A';
            if (id) {
              tmpObj.id = id;
            }
          } else {
            const newId = datasource.length + 1;
            datasource.unshift({
              id: newId,
              orgCode:'1',
              orgName,
              appKey,
              orgType,
              status:'A',
              createTime: new Date(),
            });
          }
          break;
        case 'groups':
          const tmpGroupsArray = datasource.filter(item => groupId && groupId === item.groupId);
          if (tmpGroupsArray && tmpGroupsArray.length > 0) {
            const tmpObj = tmpGroupsArray.shift();
            tmpObj.name = name;
            if (groupId) {
              tmpObj.id = groupId;
            }
          } else {
            const newId = datasource.length + 1;
            datasource.unshift({
              groupId: newId,
              name,
              status:'A',
            });
          }
          break;
        case 'component':
          const tmpArray = datasource.filter(item => componentId&&componentId.indexOf(item.componentId) !== -1);
          if (tmpArray && tmpArray.length > 0) {
            const tmpObj = tmpArray.shift();
            tmpObj.name = orgName;
            tmpObj.id = id;
            if (componentId) {
              tmpObj.componentId = componentId;
            }
          } else {
            datasource.unshift({
              componentId,
              orgName,
              id,
              createTime: new Date(),
            });
          }
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
  const result = {
    code: 200,
    list: datasource,
    pagination: {
      total: datasource.length,
    },
  };

  if (res && res.json) {
    return res.json(result);
  }
  return result;
}
export function statusBatch(req, res, u, b) {
  // console.log('statusBatch======');
  // let url = u;
  // if (!url || Object.prototype.toString.call(url) !== '[object String]') {
  //   url = req.url; // eslint-disable-line
  // }

  const body = (b && b.body) || req.body;
  const { method, tableName, data:{info},option } = body;
  const {  ids } = info;
  const datasource = getList(tableName);
  console.log('statusBatch method:',method);
  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      let status='D';
      switch (option) {
        case 3:
          status='D';
          break;
        case 4:
          status='A';
          break;
        case 5:
          status='S';
          break;
        default:
          status='A';
          break;
      }
      console.log("status batch method:",method,ids," status:",status);
      switch (tableName) {
        case 'groups':
          ids.forEach((value) => {
            const tmpObj = datasource.find(item => value && value === item.groupId);
            if (tmpObj) {
              tmpObj.status = status;
            }
            console.log('STATUS BATCH :', tmpObj);
          });
          break;
        default:
          ids.forEach( (value) => {
            const tmpObj = datasource.find(item => value && value === item.id);
            if (tmpObj) {
              tmpObj.status = status;
            }
            console.log('STATUS BATCH in default:', tmpObj);
          });
          break;
      }
      break;
    default:
      break;
  }
  const result = {
    code: 200,
    list: datasource,
    pagination: {
      total: datasource.length,
    },
  };

  if (res && res.json) {
    return res.json(result);
  }
  return result;
}


export function getOrgListByType(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;

  console.log("getOrgListByType in model", params);
  const result={...orgs};
  if (params.orgType) {
    result.data=orgs.data.filter((item)=>params.orgType.indexOf(item.orgType)!==-1);
  }

  if (res && res.json) {
    return res.json(result);
  }
  return result;
}
export default {
  'POST /baseInfo/sysdata/list': queryList,
  'POST /baseInfo/sysdata/save': save,
  'POST /baseInfo/sysdata/statusBatch': statusBatch,
  'GET /baseInfo/sysdata/sug': sug,
  'GET /baseInfo/api/allGroupList': groups,
  'GET /baseInfo/sysdata/orgList': getOrgListByType,
};
