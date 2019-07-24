// import { stringify } from 'qs';
import request from '@/utils/request';
import constants from '@/utils/constUtil';

const { PREFIX_PATH } = constants;

export async function logList(params) {
  console.log('params in queryApi:', params,`${PREFIX_PATH}/logServer/intfOrderList`);
  return request(`${PREFIX_PATH}/logServer/intfOrderList`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function logItemList(params) {
  console.log('params in queryApi:', params,`${PREFIX_PATH}/logServer/intfOrder/${params.orderCode}`);
  return request(`${PREFIX_PATH}/logServer/intfOrder/${params.orderCode}`);
}

export async function apiListBySearch(params) {
  console.log('params in queryApi:', params,`${PREFIX_PATH}/baseInfo/apiService/apiList`);
  return request(`${PREFIX_PATH}/baseInfo/apiService/apiList`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
