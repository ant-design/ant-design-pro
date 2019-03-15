// import { parse } from 'url';

const DEL_ACT = 3;
const ONLINE_ACT = 4;
const OFFLINE_ACT = 5;
const API_STATUS_0 = '0';
const API_STATUS_2 = '2';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    apiId: i,
    name: `Api Name ${i}`,
    actionName: `queryUser`,
    serviceType: Math.floor(Math.random() * 10) % 4,
    groupId: (Math.floor(Math.random() * 10) % 4) + 1,
    status: `${Math.floor(Math.random() * 10) % 3}`,
    updateTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createUser: 'Alex',
  });
}

function apiList(req, res, u, b) {
  const payload = (b && b.body) || req.body;
  console.log('payload in getApi :', payload);
  let dataSource = tableListDataSource;
  const params = payload && payload.data && payload.data.info ? payload.data.info : {};
  if (params.sorter) {
    const s = params.sorter.split('_');
    console.log('sorter:', s);
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
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      pageNo: parseInt(params.pageNo, 10) || 1,
    },
  };

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
    case DEL_ACT:
      info.apiIds.forEach(key => {
        tableListDataSource = tableListDataSource.filter(item => key !== item.apiId);
      });
      console.log('tableListDataSource', tableListDataSource[4]);
      break;
    case ONLINE_ACT:
      info.apiIds.forEach(key => {
        const apiInfo = tableListDataSource.find(item => key === item.apiId);
        apiInfo.status = API_STATUS_2;
      });
      break;
    case OFFLINE_ACT:
      info.apiIds.forEach(key => {
        const apiInfo = tableListDataSource.find(item => key === item.apiId);
        apiInfo.status = API_STATUS_0;
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

  console.log('result', result);
  return res.json(result);
}

export default {
  'POST /baseinfo/apiService/apiList': apiList,
  'POST /baseinfo/apiService/apiStatusBatch': apiStatusBatch,
  'POST /conf/forms': (req, res) => {
    res.send({ message: 'Ok' });
  },
};
