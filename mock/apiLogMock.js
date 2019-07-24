
let logListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  logListDataSource.push({
    orderId: i,
    orderCode: `orderCode${i}`,
    transactionId: i,
    sourceType:1,
    apiId:  i,
    appKey:`sssss${i}`,
    requestTime : "2019-03-19T06:28:28.000+0000",
  });
}

let logItemListDataSource = [];
for (let i = 0; i < 10; i += 1) {
  logItemListDataSource.push({
    orderItemId: i,
    orderItemCode: i,
    orderCode: `orderCode${i}`,
    status: i,
    reqTime : "2019-03-19T06:28:28.000+0000",
    respTime : "2019-03-19T06:28:28.000+0000",
    intfOrderItemMessages:[
      {
      "orderCode": "2",
      "orderItemCode": "22222",
        "address":"11111111111111111111111111111111111111111",
        "seq":"11111111111111111111111111111111111111111",
      "reqMessage":"[{\"key\":\"appkey\",\"value\":\"1111\"}]",
      "respMessage":"[{\"key\":\"appkey\",\"value\":\"2222\"}]"
      },
        {
        "orderCode": "3",
        "orderItemCode": "33333",
        "reqMessage":"[{\"key\":\"appkey\",\"value\":\"333\"}]",
        "respMessage":"[{\"key\":\"appkey\",\"value\":\"444\"}]"
      }
    ]
  });
}


function logList(req, res, u, b){
  const payload = (b && b.body) || req.body;
  let dataSource = logListDataSource;
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

  if (params.transactionId) {
    dataSource = dataSource.filter(data => data.transactionId === params.transactionId );
  }
  if (params.appKey) {
    dataSource = dataSource.filter(data => data.appKey === params.appKey );
  }
  if (params.apiId) {
    dataSource = dataSource.filter(data => data.apiId === parseInt(params.apiId,10) );
  }
  if (params.beforeTime && params.afterTime) {
    dataSource = dataSource.filter(data => data.requestTime > params.beforeTime && data.requestTime < params.afterTime);
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

function logItemList(req, res, u){
  let dataSource = logItemListDataSource;
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const orderCode =url.split("/")[4];
  if ( orderCode ) {
    dataSource = dataSource.filter(data => data.orderCode.indexOf(orderCode)!==-1 );
  }

  const result = {
    "code": "200",
    "msg": null,
    "data": {
      records: dataSource
    },
  };
  console.log("logItemList",result.data);
  return res.json(result);
}

export default {
  'POST /logServer/intfOrderList': logList,
  'GET /logServer/intfOrderInfo/(.*)': logItemList,
};
