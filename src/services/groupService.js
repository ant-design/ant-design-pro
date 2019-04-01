import request from '@/utils/request';
import constants from '@/utils/constUtil';

const { PREFIX_PATH } = constants;

export async function allGroupList() {
  return request(`${PREFIX_PATH}/baseInfo/api/allGroupList`);
}

export async function saveGroup() {
  return request(`${PREFIX_PATH}/baseInfo/api/saveGroup`);
}
