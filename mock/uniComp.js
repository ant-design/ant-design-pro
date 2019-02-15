/* eslint-disable eqeqeq */
import { parse } from 'url';

// mock tableListDataSource
let tableListDataSource = [];
let groupsDataSource = [];
let componentDataSource = [];
const serviceDataSource = [];

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
    case 'service':
      dataSource = serviceDataSource;
      break;
    default:
      break;
  }
  return dataSource;
}
function pushGroups() {
  const groupId = ['语音识别', 'OCR识别', '身份识别', '文本识别'];
  groupId.forEach((value, index) => {
    groupsDataSource.push({
      disabled: false,
      id: index,
      name: value,
    });
  });
}
function pushOrg() {
  tableListDataSource.push({
    disabled: false,
    id: `9191`,
    orgCode: `9191`,
    orgName: `letsgoOrg`,
    appKey: `1001001`,
    orgType: `1`,
    stateTime: new Date(`2017-07-12`),
  });
  tableListDataSource.push({
    disabled: false,
    id: `9192`,
    orgCode: `9192`,
    orgName: `TDC`,
    appKey: `1001002`,
    orgType: `2`,
    stateTime: new Date(`2017-07-12`),
  });
  for (let i = 70000; i < 70026; i += 1) {
    tableListDataSource.push({
      disabled: i % 6 === 0,
      id: `${i}`,
      orgCode: `${i}`,
      orgName: `Org ${i}`,
      appKey: `100${i}`,
      orgType: `${Math.floor(Math.random() * 10) % 3}`,
      createTime: new Date(`2017-07-${Math.floor((i - 70000) / 2) + 1}`),
    });
  }
}
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
pushOrg();
pushComponent();
pushGroups();

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
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = (b && b.body) || req.body;

  // const params = parse(url, true).query;

  let dataSource = [...getList(params.tableName)];
  console.debug(url, params, dataSource.length);
  if (params.sorter) {
    const s = params.sorter.split('_');
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
  const keys = Object.keys(params); // 根据查询条件（form表单）的参数，过滤列表
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
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };
  if (res && res.json) {
    return res.json(result);
  }
  return result;
}
export function postInfo(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { tableName, method, orgCode, orgName, id, componentId, name } = body;
  const { appKey, orgType } = body;
  console.log('postInfo', body, id);
  const datasource = getList(tableName);
  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      switch (tableName) {
        case 'org':
          tableListDataSource = tableListDataSource.filter(item => id.indexOf(item.id) === -1);
          console.log('delete :', tableListDataSource);
          break;
        case 'groups':
          groupsDataSource = groupsDataSource.filter(item => id.indexOf(item.id) === -1);
          console.log('delete :', groupsDataSource);
          break;
        default:
          componentDataSource = componentDataSource.filter(item => id.indexOf(item.id) === -1);
          break;
      }
      break;
    case 'post':
      switch (tableName) {
        case 'org':
          const tmpOrgArray = datasource.filter(item => id && id == item.id);
          if (tmpOrgArray && tmpOrgArray.length > 0) {
            const tmpObj = tmpOrgArray.shift();
            tmpObj.orgCode = orgCode;
            tmpObj.orgName = orgName;
            tmpObj.appKey = appKey;
            tmpObj.orgType = orgType;
            if (id) {
              tmpObj.id = id;
            }
          } else {
            const newId = datasource.length + 1;
            datasource.unshift({
              id: newId,
              orgCode,
              orgName,
              appKey,
              orgType,
              createTime: new Date(),
            });
          }
          break;
        case 'groups':
          const tmpGroupsArray = datasource.filter(item => id && id == item.id);
          if (tmpGroupsArray && tmpGroupsArray.length > 0) {
            const tmpObj = tmpGroupsArray.shift();
            tmpObj.name = name;
            if (id) {
              tmpObj.id = id;
            }
          } else {
            const newId = datasource.length + 1;
            datasource.unshift({
              id: newId,
              name,
            });
          }
          break;
        default:
          const tmpArray = datasource.filter(item => componentId.indexOf(item.componentId) !== -1);
          if (tmpArray && tmpArray.length > 0) {
            const tmpObj = tmpArray.shift();
            tmpObj.code = orgCode;
            tmpObj.name = orgName;
            tmpObj.id = id;
            if (componentId) {
              tmpObj.componentId = componentId;
            }
          } else {
            datasource.unshift({
              componentId,
              orgCode,
              orgName,
              id,
              createTime: new Date(),
            });
          }
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

export default {
  'POST /uniComp/queryList.do': queryList,
  'POST /uniComp/postInfo.do': postInfo,
  'GET /uniComp/sug.do': sug,
};
