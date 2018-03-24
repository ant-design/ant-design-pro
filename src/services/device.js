import { stringify } from 'qs';
import request from '../utils/request';

export async function queryDevices(params) {
  return request(`/api/items/device?${stringify(params)}`);
}
