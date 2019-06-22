import request from '@/utils/request';
import constants from '@/utils/constUtil';
import { stringify } from 'qs';

const { PREFIX_PATH } = constants;

export async function allGroupList() {
  return request(`${PREFIX_PATH}/baseInfo/api/allGroupList`);
}
export async function getAdapterList(params) {
  return request(`${PREFIX_PATH}/baseInfo/sysdata/adapterList?${stringify(params)}`);
}

export async function orgList(params) {
  return request(`${PREFIX_PATH}/baseInfo/sysdata/orgList?${stringify(params)}`);
}

export async function refreshCache() {
  return request(`${PREFIX_PATH}/baseInfo/cache/refresh`);
}
