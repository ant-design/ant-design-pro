// import { stringify } from 'qs';
import request from '@/utils/request';
import constants from '@/utils/constUtil';

const { PREFIX_PATH } = constants;

export async function apiList(params) {
  console.log('params in queryApi:', params,`${PREFIX_PATH}/baseInfo/apiService/apiList`);
  return request(`${PREFIX_PATH}/baseInfo/apiService/apiList`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function apiStatusBatch(params) {
  // console.log('params:', params);
  return request(`${PREFIX_PATH}/baseInfo/apiService/apiBatch`, {
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

export async function apiInfo(params) {
  console.log('params in queryApi:', params);
  return request(`${PREFIX_PATH}/baseInfo/apiService/apiInfo`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function saveApi(params) {
  return request(`${PREFIX_PATH}/baseInfo/apiService/saveApi`, {
    method: 'POST',
    body: params,
  });
}

// --------enumMock.js--------------
export async function getMasterData(params) {
  return request(`${PREFIX_PATH}enum/${params.key}`);
}
