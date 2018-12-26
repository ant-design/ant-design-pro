import { stringify } from 'qs';
import request from '@/utils/request';
import constants from '@/utils/constUtil';

const { PREFIX_PATH } = constants;

export async function queryApi(params) {
  console.log('params in queryApi:', params);
  return request(`/conf/apiGateway?${stringify(params)}`);
}

export async function removeApi(params) {
  console.log('params:', params);
  return request('/conf/apiGateway', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addApi(params) {
  return request('/conf/apiGateway', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateApi(params) {
  return request('/conf/apiGateway', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function saveApi(params) {
  return request('/conf/save/api', {
    method: 'POST',
    body: params,
  });
}

// --------masterData.js--------------
export async function getMasterData(params) {
  return request(`${PREFIX_PATH}enum/${params.key}`);
}
