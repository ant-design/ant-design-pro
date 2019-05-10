import { parse } from 'url';
import moment from 'moment';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 34; i += 1) {
  tableListDataSource.push({
    key: i,
    // disabled: i % 6 === 0, 提供这个值可以灰掉前面的复选框
    callNo: Math.floor(Math.random() * 100),
    updatedAt: new Date(`2019-05-${Math.floor(i / 2) + 1}`),
    createdAt: new Date(`2019-05-${Math.floor(i / 2) + 1}`),
    progress: Math.ceil(Math.random() * 100),
    qqno: Math.floor(Math.random() * 1000000000),
    budget: Math.floor(Math.random() * 10) % 2,
    type: Math.floor(Math.random() * 10) % 3,
    scoreleft: Math.floor(Math.random() * 10000),
    detail: `我是一个备注${i}`,
  });
}

function getNetBar(req, res, u) {
  // console.log('getNetBar: ', 'req-', req, '  res: ', res, '  u: ', u);
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;
  // console.log('getNetbar -- params: ', params);
  let dataSource = tableListDataSource;

  // 排序
  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  // qq号匹配
  if (params.qqno) {
    const qqno = params.qqno.split(',');
    // console.log('qqno: ', qqno);
    let filterDataSource = [];
    qqno.forEach(s => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => parseInt(data.qqno, 10) === parseInt(s, 10))
      );
    });
    dataSource = filterDataSource;
  }

  // 收支类型匹配
  if (params.budget) {
    const budget = params.budget.split(',');
    let filterDataSource = [];
    budget.forEach(s => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => parseInt(data.budget, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  // 类型匹配
  if (params.type) {
    const type = params.type.split(',');
    let filterDataSource = [];
    type.forEach(s => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => parseInt(data.type, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  // 交易额查询
  if (params.callNomin || params.callNomax) {
    let callNomin = 0;
    if (params.callNomin) {
      callNomin = parseInt(params.callNomin, 10);
    }
    if (params.callNomax) {
      const callNomax = parseInt(params.callNomax, 10);
      dataSource = dataSource.filter(
        data => parseInt(data.callNo, 10) >= callNomin && parseInt(data.callNo, 10) <= callNomax
      );
    } else {
      dataSource = dataSource.filter(data => parseInt(data.callNo, 10) >= callNomin);
    }
  }

  // 积分余额查询
  if (params.scoreleftmin || params.scoreleftmax) {
    // console.log("params.scoreleftmin: ", params.scoreleftmin, "params.scoreleftmax: ", params.scoreleftmax)
    let scoreleftmin = 0;
    if (params.scoreleftmin) {
      scoreleftmin = parseInt(params.scoreleftmin, 10);
    }
    if (params.scoreleftmax) {
      const scoreleftmax = parseInt(params.scoreleftmax, 10);
      // console.log('filter scoreleftmin && scoreleftmax', scoreleftmin, ' -- ', scoreleftmax);
      dataSource = dataSource.filter(
        data =>
          parseInt(data.scoreleft, 10) >= scoreleftmin &&
          parseInt(data.scoreleft, 10) <= scoreleftmax
      );
    } else {
      // console.log('filter scoreleftmin', scoreleftmin);
      dataSource = dataSource.filter(data => parseInt(data.scoreleft, 10) >= scoreleftmin);
    }
  }

  if (params.begintime || params.endtime) {
    // console.log('params.begintime: ', params.begintime, 'params.endtime: ', params.endtime);
    let begintime = moment("1977-12-25").unix(Number);
    let endtime = moment("2995-12-25").unix(Number);
    if (params.begintime) {
      // eslint-disable-next-line prefer-destructuring
      begintime = params.begintime;
    }
    if (params.endtime) {
      // eslint-disable-next-line prefer-destructuring
      endtime = params.endtime;
    }
    dataSource = dataSource.filter(
        data =>
          moment(data.updatedAt).unix(Number) >= begintime &&
          moment(data.updatedAt).unix(Number) <= endtime
      );
  }

  // 备注匹配
  if (params.detail) {
    dataSource = dataSource.filter(data => data.detail.indexOf(params.detail) > -1);
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
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  return res.json(result);
}

function postNetBar(req, res, u, b) {
  // console.log('postNetBar: ', 'req-', req, '  res: ', res, '  u: ', u, ' b: ', b);
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => key.indexOf(item.key) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        disabled: i % 6 === 0,
        callNo: Math.floor(Math.random() * 100),
        updatedAt: new Date(`2019-05-${Math.floor(i / 2) + 1}`),
        createdAt: new Date(`2019-05-${Math.floor(i / 2) + 1}`),
        progress: Math.ceil(Math.random() * 100),
        qqno: Math.floor(Math.random() * 1000000000),
        budget: Math.floor(Math.random() * 10) % 2,
        type: Math.floor(Math.random() * 10) % 3,
        scoreleft: Math.floor(Math.random() * 10000),
        detail: `我是一个备注${i}`,
      });
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(item => {
        if (item.key === key) {
          Object.assign(item, { desc, name });
          return item;
        }
        return item;
      });
      break;
    default:
      break;
  }

  return getNetBar(req, res, u);
}

export default {
  'GET /api/netbar': getNetBar,
  'POST /api/netbar': postNetBar,
};
