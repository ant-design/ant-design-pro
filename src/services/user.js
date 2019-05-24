import request from '@/utils/request';
import constants from '@/utils/constUtil';

const { PREFIX_PATH } = constants;

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  // return request('/api/currentUser');
  return request(`${PREFIX_PATH}/baseInfo/sysUser/currentUser`);
  // return request(`/baseInfo/sysUser/currentUser`);
}
