import { stringify } from 'qs';
import request from '../utils/request';

export async function queryDevices(params) {
  return request(`/api/items/device?${stringify(params)}`);
}

export async function addDevice(params) {
  return request('/api/items/device', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
