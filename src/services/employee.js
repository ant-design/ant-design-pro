import request from '@/utils/request';
import { stringify } from 'qs';

export async function query(params) {
    return request(`/api/v1/employee/page?${stringify(params)}`);
}

export async function queryById(params) {
  return request('/api/v1/employee/get/' + params);
}

export async function deleteById(params) {
  return request('/api/v1/employee/delete/' + params, {
    method: 'DELETE',
  });
}

export async function addEmployee(params) {
  return request('/api/v1/employee/add', {
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
