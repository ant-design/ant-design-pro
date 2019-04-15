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
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function statusBatch(params) {
  return request(`${PREFIX_PATH}/baseInfo/sysdata/statusBatch`, {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function detail(params) {
  return request(`${PREFIX_PATH}/baseInfo/sysdata/detail`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function save(params) {
  return request(`${PREFIX_PATH}/baseInfo/sysdata/save`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
