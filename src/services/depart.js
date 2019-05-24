import request from '@/utils/request';
import { stringify } from 'qs';

export async function query(params) {
  return request(`/api/v1/depart/all`);
}

export async function queryById(params) {
  return request('/api/v1/depart/get/' + params);
}

export async function deleteById(params) {
  return request('/api/v1/depart/delete/' + params, {
    method: 'DELETE',
  });
}

export async function addDepart(params) {
  return request('/api/v1/depart/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateDepart(params) {
  return request('/api/v1/depart/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
