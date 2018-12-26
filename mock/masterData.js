import { getLastPath } from './mockUtils';
import '../src/utils/const';

const ConstUtil = global.const;

function getMasterData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const key = getLastPath(url);

  const result = {
    code: 200,
    msg: '',
    data: {
      rows: [],
    },
  };

  const apiStateRows = [
    { itemCode: '0', itemValue: '关闭' },
    { itemCode: '1', itemValue: '未发布' },
    { itemCode: '2', itemValue: '已发布' },
  ];

  const stateRows = [{ itemCode: '0', itemValue: '禁用' }, { itemCode: '1', itemValue: '在用' }];

  const roleTypeRows = [
    { itemCode: 'user', itemValue: '普通用户' },
    { itemCode: 'manager', itemValue: '业务管理员' },
    { itemCode: 'admin', itemValue: '系统管理员' },
  ];

  if (key === ConstUtil.COMMON_STATE_KEY) {
    result.data.rows = stateRows;
  } else if (key === ConstUtil.API_STATE_KEY) {
    result.data.rows = apiStateRows;
  } else if (key === ConstUtil.ROLE_TYPE_KEY) {
    result.data.rows = roleTypeRows;
  }
  console.log('getMasterData in mock', result.data.rows.length);
  if (res && res.json) {
    return res.json(result);
  }
  return result;
}
export default {
  [`GET ${ConstUtil.PREFIX_PATH}enum/(.*)`]: getMasterData,
};
