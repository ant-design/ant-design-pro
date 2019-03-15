// import { getLastPath } from './mockUtils';

const allResult = {
  code: '200',
  msg: null,
  data: [
    {
      id: 1,
      javaCode: 'apiService',
      javaKey: 'status',
      itemCode: '0',
      itemValue: '关闭',
    },
    {
      id: 2,
      javaCode: 'apiService',
      javaKey: 'status',
      itemCode: '1',
      itemValue: '未发布',
    },
    {
      id: 3,
      javaCode: 'apiService',
      javaKey: 'status',
      itemCode: '2',
      itemValue: '已发布',
    },
    {
      id: 4,
      javaCode: 'common',
      javaKey: 'status',
      itemCode: '0',
      itemValue: '禁用',
    },
    {
      id: 5,
      javaCode: 'common',
      javaKey: 'status',
      itemCode: '1',
      itemValue: '在用',
    },
    {
      id: 6,
      javaCode: 'org',
      javaKey: 'orgType',
      itemCode: '1',
      itemValue: '提供方',
    },
    {
      id: 7,
      javaCode: 'org',
      javaKey: 'orgType',
      itemCode: '2',
      itemValue: '消费方',
    },
    {
      id: 8,
      javaCode: 'org',
      javaKey: 'orgType',
      itemCode: '0',
      itemValue: 'Both',
    },
    {
      id: 9,
      javaCode: 'apiService',
      javaKey: 'service_type',
      itemCode: '1',
      itemValue: 'Rest',
    },
    {
      id: 10,
      javaCode: 'apiService',
      javaKey: 'service_type',
      itemCode: '2',
      itemValue: 'Web Service',
    },
    {
      id: 11,
      javaCode: 'apiService',
      javaKey: 'service_type',
      itemCode: '3',
      itemValue: 'Http',
    },
    {
      id: 12,
      javaCode: 'apiService',
      javaKey: 'protocol',
      itemCode: 'http',
      itemValue: 'http',
    },
    {
      id: 13,
      javaCode: 'apiService',
      javaKey: 'protocol',
      itemCode: 'https',
      itemValue: 'https',
    },
    {
      id: 14,
      javaCode: 'apiService',
      javaKey: 'security_type',
      itemCode: '1',
      itemValue: '无认证',
    },
    {
      id: 15,
      javaCode: 'apiService',
      javaKey: 'security_type',
      itemCode: '2',
      itemValue: 'token 认证',
    },
    {
      id: 16,
      javaCode: 'apiService',
      javaKey: 'security_type',
      itemCode: '3',
      itemValue: '数字签名认证',
    },
    {
      id: 17,
      javaCode: 'apiService',
      javaKey: 'match_type',
      itemCode: '1',
      itemValue: '前缀匹配',
    },
    {
      id: 18,
      javaCode: 'apiService',
      javaKey: 'match_type',
      itemCode: '2',
      itemValue: '完全匹配',
    },
    {
      id: 19,
      javaCode: 'apiService',
      javaKey: 'api_type',
      itemCode: '2',
      itemValue: '内部使用',
    },
    {
      id: 20,
      javaCode: 'apiService',
      javaKey: 'api_type',
      itemCode: '1',
      itemValue: '外部使用',
    },
    {
      id: 21,
      javaCode: 'common',
      javaKey: 'req_mothod',
      itemCode: '1',
      itemValue: 'get',
    },
    {
      id: 22,
      javaCode: 'common',
      javaKey: 'req_mothod',
      itemCode: '2',
      itemValue: 'post',
    },
    {
      id: 23,
      javaCode: 'common',
      javaKey: 'req_mothod',
      itemCode: '3',
      itemValue: 'delete',
    },
    {
      id: 24,
      javaCode: 'common',
      javaKey: 'req_mothod',
      itemCode: '4',
      itemValue: 'put',
    },
    {
      id: 25,
      javaCode: 'apiServiceBackend',
      javaKey: 'protocol',
      itemCode: 'http',
      itemValue: 'http',
    },
    {
      id: 26,
      javaCode: 'apiServiceBackend',
      javaKey: 'protocol',
      itemCode: 'https',
      itemValue: 'https',
    },
    {
      id: 27,
      javaCode: 'apiServiceBackend',
      javaKey: 'service_type',
      itemCode: '1',
      itemValue: 'Rest',
    },
    {
      id: 28,
      javaCode: 'apiServiceBackend',
      javaKey: 'service_type',
      itemCode: '2',
      itemValue: 'Web Service',
    },
    {
      id: 29,
      javaCode: 'apiServiceBackend',
      javaKey: 'service_type',
      itemCode: '3',
      itemValue: 'Http',
    },
    {
      id: 30,
      javaCode: 'apiServiceBackend',
      javaKey: 'service_type',
      itemCode: '4',
      itemValue: 'Javacall',
    },
    {
      id: 31,
      javaCode: 'common',
      javaKey: 'req_mothod',
      itemCode: '5',
      itemValue: 'patch',
    },
    {
      id: 32,
      javaCode: 'common',
      javaKey: 'req_mothod',
      itemCode: '6',
      itemValue: 'options',
    },
    {
      id: 33,
      javaCode: 'org',
      javaKey: 'status',
      itemCode: 'A',
      itemValue: '激活',
    },
    {
      id: 34,
      javaCode: 'org',
      javaKey: 'status',
      itemCode: 'D',
      itemValue: '删除',
    },
    {
      id: 35,
      javaCode: 'org',
      javaKey: 'status',
      itemCode: 'S',
      itemValue: '停用',
    },
    {
      id: 36,
      javaCode: 'apiServiceOrg',
      javaKey: 'status',
      itemCode: 'A',
      itemValue: '激活',
    },
    {
      id: 37,
      javaCode: 'apiServiceOrg',
      javaKey: 'status',
      itemCode: 'S',
      itemValue: '停用',
    },
    {
      id: 38,
      javaCode: 'apiServiceOrg',
      javaKey: 'status',
      itemCode: 'D',
      itemValue: '删除',
    },
  ],
};

function getMasterData(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { javaCode, javaKey } = body;
  const result = {
    code: '200',
    msg: null,
    data: [],
  };

  const rows = allResult.data.filter(obj => obj.javaCode === javaCode && obj.javaKey === javaKey);
  result.data = rows;

  console.log('getMasterData in mock', result.data.length);
  if (res && res.json) {
    return res.json(result);
  }
  return result;
}
export default {
  [`GET /baseinfo/sys/enumList`]: getMasterData,
  [`GET /baseinfo/sys/allEnumList`]: allResult,
};
