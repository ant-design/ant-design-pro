import {stringify} from 'qs';
import request from '../utils/request';
import constants from '@/utils/constUtil';

const { PREFIX_PATH } = constants;

export async function sug(params) {
  return request(`${PREFIX_PATH}/baseInfo/sysdata/sug?${stringify(params)}`);
}
export async function list(params) {
  return request(`${PREFIX_PATH}/baseInfo/sysdata/${params.tableName}/list`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function statusBatch(params) {
  return request(`${PREFIX_PATH}/baseInfo/sysdata/${params.tableName}/statusBatch`, {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function detail(params) {
  return request(`${PREFIX_PATH}/baseInfo/sysdata/${params.tableName}/detail`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function save(params) {
  return request(`${PREFIX_PATH}/baseInfo/sysdata/${params.tableName}/save`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function token(params){
  return request(`${PREFIX_PATH}/baseInfo/sysdata/generateToken?appkey=${params.appkey}`, {
    method: 'GET',
    data: {
      ...params,
      method: 'get',
    },
  });
}
export async function del(params){
  return request(`${PREFIX_PATH}/baseInfo/sysdata/${params.tableName}/delete?id=${params.id}`, {
    method: 'GET',
    data: {
      ...params,
      method: 'get',
    },
  });
}
