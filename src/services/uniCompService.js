import {stringify} from 'qs';
import request from '../utils/request';
import constants from '@/utils/constUtil';

const { PREFIX_PATH } = constants;

export async function sug(params) {
  return request(`${PREFIX_PATH}/baseInfo/sysdata/sug?${stringify(params)}`);
}
export async function list(params) {
  return request(`${PREFIX_PATH}/baseInfo/sysdata/list`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function statusBatch(params) {
  console.log("unicomp statusBatch in service:",params);
  return request(`${PREFIX_PATH}/baseInfo/sysdata/statusBatch`, {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function save(params) {
  console.log("unicomp postSave in service:",params);
  return request(`${PREFIX_PATH}/baseInfo/sysdata/save`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
