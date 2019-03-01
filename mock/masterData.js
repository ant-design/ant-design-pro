import { getLastPath } from './mockUtils';
import '../src/utils/const';

const ConstUtil = global.const;

const allResult = {
  code: '200',
  msg: null,
  data: [
    {
      id: 1,
      javaCode: 'apiService',
      key: 'status',
      itemCode: '0',
      itemValue: '关闭',
    },
    {
      id: 2,
      javaCode: 'apiService',
      key: 'status',
      itemCode: '1',
      itemValue: '未发布',
    },
    {
      id: 3,
      javaCode: 'apiService',
      key: 'status',
      itemCode: '2',
      itemValue: '已发布',
    },
    {
      id: 4,
      javaCode: 'common',
      key: 'status',
      itemCode: '0',
      itemValue: '禁用',
    },
    {
      id: 5,
      javaCode: 'common',
      key: 'status',
      itemCode: '1',
      itemValue: '在用',
    },
    {
      id: 6,
      javaCode: 'org',
      key: 'orgType',
      itemCode: '1',
      itemValue: '提供方',
    },
    {
      id: 7,
      javaCode: 'org',
      key: 'orgType',
      itemCode: '2',
      itemValue: '消费方',
    },
    {
      id: 8,
      javaCode: 'org',
      key: 'orgType',
      itemCode: '0',
      itemValue: 'Both',
    },
    {
      id: 9,
      javaCode: 'apiService',
      key: 'service_type',
      itemCode: '1',
      itemValue: 'Rest',
    },
    {
      id: 10,
      javaCode: 'apiService',
      key: 'service_type',
      itemCode: '2',
      itemValue: 'Web Service',
    },
    {
      id: 11,
      javaCode: 'apiService',
      key: 'service_type',
      itemCode: '3',
      itemValue: 'Http',
    },
    {
      id: 12,
      javaCode: 'apiService',
      key: 'protocol',
      itemCode: 'http',
      itemValue: 'http',
    },
    {
      id: 13,
      javaCode: 'apiService',
      key: 'protocol',
      itemCode: 'https',
      itemValue: 'https',
    },
    {
      id: 14,
      javaCode: 'apiService',
      key: 'security_type',
      itemCode: '1',
      itemValue: '无认证',
    },
    {
      id: 15,
      javaCode: 'apiService',
      key: 'security_type',
      itemCode: '2',
      itemValue: 'token 认证',
    },
    {
      id: 16,
      javaCode: 'apiService',
      key: 'security_type',
      itemCode: '3',
      itemValue: '数字签名认证',
    },
    {
      id: 17,
      javaCode: 'apiService',
      key: 'match_type',
      itemCode: '1',
      itemValue: '前缀匹配',
    },
    {
      id: 18,
      javaCode: 'apiService',
      key: 'match_type',
      itemCode: '2',
      itemValue: '完全匹配',
    },
    {
      id: 19,
      javaCode: 'apiService',
      key: 'api_type',
      itemCode: '2',
      itemValue: '内部使用',
    },
    {
      id: 20,
      javaCode: 'apiService',
      key: 'api_type',
      itemCode: '1',
      itemValue: '外部使用',
    },
    {
      id: 21,
      javaCode: 'common',
      key: 'req_mothod',
      itemCode: '1',
      itemValue: 'get',
    },
    {
      id: 22,
      javaCode: 'common',
      key: 'req_mothod',
      itemCode: '2',
      itemValue: 'post',
    },
    {
      id: 23,
      javaCode: 'common',
      key: 'req_mothod',
      itemCode: '3',
      itemValue: 'delete',
    },
    {
      id: 24,
      javaCode: 'common',
      key: 'req_mothod',
      itemCode: '4',
      itemValue: 'put',
    },
    {
      id: 25,
      javaCode: 'apiServiceBackend',
      key: 'protocol',
      itemCode: 'http',
      itemValue: 'http',
    },
    {
      id: 26,
      javaCode: 'apiServiceBackend',
      key: 'protocol',
      itemCode: 'https',
      itemValue: 'https',
    },
    {
      id: 27,
      javaCode: 'apiServiceBackend',
      key: 'service_type',
      itemCode: '1',
      itemValue: 'Rest',
    },
    {
      id: 28,
      javaCode: 'apiServiceBackend',
      key: 'service_type',
      itemCode: '2',
      itemValue: 'Web Service',
    },
    {
      id: 29,
      javaCode: 'apiServiceBackend',
      key: 'service_type',
      itemCode: '3',
      itemValue: 'Http',
    },
    {
      id: 30,
      javaCode: 'apiServiceBackend',
      key: 'service_type',
      itemCode: '4',
      itemValue: 'Javacall',
    },
    {
      id: 31,
      javaCode: 'common',
      key: 'req_mothod',
      itemCode: '5',
      itemValue: 'patch',
    },
    {
      id: 32,
      javaCode: 'common',
      key: 'req_mothod',
      itemCode: '6',
      itemValue: 'options',
    },
    {
      id: 33,
      javaCode: 'org',
      key: 'status',
      itemCode: 'A',
      itemValue: '激活',
    },
    {
      id: 34,
      javaCode: 'org',
      key: 'status',
      itemCode: 'D',
      itemValue: '删除',
    },
    {
      id: 35,
      javaCode: 'org',
      key: 'status',
      itemCode: 'S',
      itemValue: '停用',
    },
    {
      id: 36,
      javaCode: 'apiServiceOrg',
      key: 'status',
      itemCode: 'A',
      itemValue: '激活',
    },
    {
      id: 37,
      javaCode: 'apiServiceOrg',
      key: 'status',
      itemCode: 'S',
      itemValue: '停用',
    },
    {
      id: 38,
      javaCode: 'apiServiceOrg',
      key: 'status',
      itemCode: 'D',
      itemValue: '删除',
    },
    {
      id: 39,
      javaCode: 'common',
      key: 'role_type',
      itemCode: 'user',
      itemValue: '普通用户',
    },
    {
      id: 40,
      javaCode: 'common',
      key: 'role_type',
      itemCode: 'manager',
      itemValue: '普通管理员',
    },
    {
      id: 41,
      javaCode: 'common',
      key: 'role_type',
      itemCode: 'admin',
      itemValue: '系统管理员',
    },
  ],
};
function getMasterData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const key = getLastPath(url);

  const result = {
    code: '200',
    msg: null,
    data: [],
  };

  const apiStateRows = allResult.data.filter(
    obj => obj.javaCode === 'apiService' && obj.key === 'status'
  );

  const stateRows = allResult.data.filter(obj => obj.javaCode === 'common' && obj.key === 'status');
  const roleTypeRows = allResult.data.filter(
    obj => obj.javaCode === 'common' && obj.key === 'role_type'
  );

  if (key === ConstUtil.COMMON_STATE_KEY) {
    result.data = stateRows;
  } else if (key === ConstUtil.API_STATE_KEY) {
    result.data = apiStateRows;
  } else if (key === ConstUtil.ROLE_TYPE_KEY) {
    result.data = roleTypeRows;
  }
  console.log('getMasterData in mock', result.data.length);
  if (res && res.json) {
    return res.json(result);
  }
  return result;
}
export default {
  [`GET ${ConstUtil.PREFIX_PATH}／sys／enumList`]: getMasterData,
};
