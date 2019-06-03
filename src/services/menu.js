import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryMenus(params) {
  return request('/api/v1/menu/all');
}

export async function queryCurrentMenus(params) {
  return request('/api/v1/menu/currentUserMenus');
}

export async function addMenu(params) {
  return request('/api/v1/menu/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function queryById(params) {
  return request('/api/v1/menu/get/' + params);
}

export async function updateMenu(params) {
  return request('/api/v1/menu/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function deleteById(params) {
  return request('/api/v1/menu/delete/' + params, {
    method: 'DELETE',
  });
}
