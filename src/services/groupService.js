import request from '@/utils/request';
import '../utils/const';

const ConstUtil = global.const;

export async function allGroupList() {
  return request(`${ConstUtil.PREFIX_PATH}/baseinfo/api/allGroupList`);
}

export async function saveGroup() {
  return request(`${ConstUtil.PREFIX_PATH}/baseinfo/api/saveGroup`);
}
