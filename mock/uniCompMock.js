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
        "status": "A"
      },
      {
        "groupId": 2,
        "groupName": "OCR识别",
        "groupDesc": "aaaaa",
        "groupApiDoc": "bbbbbb",
        "status": "A"
      },
      {
        "groupId":3,
        "groupName": "身份识别",
        "groupDesc": "aaaaa1",
        "groupApiDoc": "bbbbbb1",
        "status": "A"
      },
      {
        "groupId": 4,
        "groupName": "文本识别",
        "groupDesc": null,
        "groupApiDoc": null,
        "status": "A"
      }
    ]
  };
const orgs={
  "code": "200",
  "msg": null,
  "data": [
    {
      "orgName": "111",
      "tokenExpireTime": 1800,
      "orgTypeName": "",
      "orgType": "2",
      "password": "StudySC",
      "createTime": "2019-04-04T08:04:54.000+0000",
      "orgCode": "test21111",
      "statusName": "",
      "tel": "1",
      "appkey": "000001",
      "id": 1,
      "authType": "1",
      "email": "111",
      "status": "A"
    },
    {
      "orgType": "2",
      "password": "StudySC",
      "orgName": "billing",
      "createTime": "2019-04-03T09:02:21.000+0000",
      "orgCode": "test2",
      "orgTypeName": "",
      "statusName": "",
      "appkey": "000002",
      "id": 2,
      "authType": "2",
      "status": "A"
    },
    {
      "orgType": "2",
      "password": "StudySC",
      "orgName": "ose",
      "createTime": "2019-04-03T09:02:22.000+0000",
      "orgCode": "test21111",
      "orgTypeName": "",
      "statusName": "",
      "appkey": "000003",
      "id": 3,
      "authType": "3",
      "status": "A"
    },
    {
      "orgType": "0",
      "password": "StudySC",
      "orgName": "baidu",
      "createTime": "2019-04-03T09:02:23.000+0000",
      "orgCode": "abc",
      "orgTypeName": "",
      "statusName": "",
      "appkey": "000004",
      "id": 4,
      "authType": "2",
      "status": "A"
    },
    {
      "orgType": "2",
      "password": "StudySC",
      "orgName": "facebook",
      "createTime": "2019-04-03T09:02:24.000+0000",
      "orgCode": "test2",
      "orgTypeName": "",
      "statusName": "",
      "appkey": "000005",
      "id": 5,
      "authType": "2",
      "status": "A"
    },
    {
      "orgType": "2",
      "password": "StudySC",
      "orgName": "google",
      "createTime": "2019-04-03T09:02:25.000+0000",
      "orgCode": "test2",
      "orgTypeName": "",
      "statusName": "",
      "appkey": "000006",
      "id": 6,
      "authType": "2",
      "status": "A"
    },
    {
      "orgType": "0",
      "password": "StudySC",
      "orgName": "tdc",
      "createTime": "2019-04-03T09:02:29.000+0000",
      "orgCode": "test2",
      "orgTypeName": "",
      "statusName": "",
      "appkey": "000007",
      "id": 7,
      "authType": "2",
      "status": "A"
    },
    {
      "orgType": "0",
      "orgName": "let",
      "createTime": "2019-04-04T07:15:24.000+0000",
      "orgCode": "111_11",
      "orgTypeName": "",
      "statusName": "",
      "appkey": "111",
      "id": 24,
      "authType": "1",
      "status": "A"
    },
    {
      "orgType": "2",
      "password": "h4J9d7R8N",
      "orgName": "111",
      "tokenExpireTime": 100,
      "createTime": "2019-04-04T08:05:16.000+0000",
      "orgCode": "10000000015",
      "orgTypeName": "",
      "statusName": "",
      "appkey": "10000000015",
      "id": 28,
      "authType": "1",
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
    case 'api_group':
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
  // console.log('pushOrg');
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;
  let dataSource = getList(params.t);

  // console.log(url, params, dataSource.length);
  let no = 'code';
  const title = 'name';
  if (params.t === 'org') {
    no = 'orgCode';
  }
  // console.log('no:', no, title);
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
    // console.log("----:",info[key]);
    if (info[key]) {
      dataSource = dataSource.filter(data => {
        const value = data[key];
        if (value) {
          return value.indexOf(info[key]) > -1;
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
        pageNo: parseInt(params.pageNo, 10) || 1,
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
  const {  orgType, orgName, id, componentId, groupName,appKey, groupId,authType,tel,email,remark } = info;
  // console.log('save in mock:', body, id);
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
            tmpObj.appkey = appKey;
            tmpObj.orgType = orgType;
            tmpObj.tel=tel;
            tmpObj.remark=remark;
            tmpObj.email=email;
            tmpObj.authType=authType;
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
              appkey:`appkey${newId}`,
              authType,
              tel,
              email,
              orgType,
              remark,
              status:'A',
              createTime: new Date(),
            });
          }
          break;
        case 'api_group':
          const tmpGroupsArray = datasource.filter(item => groupId && groupId === item.groupId);
          if (tmpGroupsArray && tmpGroupsArray.length > 0) {
            const tmpObj = tmpGroupsArray.shift();
            tmpObj.groupName = groupName;
            if (groupId) {
              tmpObj.id = groupId;
            }
          } else {
            const newId = datasource.length + 1;
            datasource.unshift({
              groupId: newId,
              groupName,
              status:'A',
            });
            console.log("datasource:",datasource);
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
  console.log(datasource.length);
  console.log("---:",groupsDataSource.length);
  const result = {
    code: "200",
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
  // console.log('statusBatch method:',method);
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
      // console.log("status batch method:",method,ids," status:",status);
      switch (tableName) {
        case 'api_group':
          ids.forEach((value) => {
            const tmpObj = datasource.find(item => value && value === item.groupId);
            if (tmpObj) {
              tmpObj.status = status;
            }
          });
          break;
        default:
          ids.forEach( (value) => {
            const tmpObj = datasource.find(item => value && value === item.id);
            if (tmpObj) {
              tmpObj.status = status;
            }
            // console.log('STATUS BATCH in default:', tmpObj);
          });
          break;
      }
      break;
    default:
      break;
  }
  const result = {
    code: "200",
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

  // console.log("getOrgListByType in model", params);
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
