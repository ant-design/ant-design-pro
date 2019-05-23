import request from '@/utils/request';

export async function query(params) {
  return request(`/api/v1/dict/all`);
}

export async function queryByCodeType(params) {
  return request('/api/v1/dict/get/' + params);
}

export async function deleteById(params) {
  return request('/api/v1/dict/delete/' + params, {
    method: 'DELETE',
  });
}

export async function deleteItemById(params) {
  return request('/api/v1/dict/item/delete/' + params, {
    method: 'DELETE',
  });
}

export async function addDict(params) {
  return request('/api/v1/dict/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addDictItem(params) {
  return request('/api/v1/dict/item/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateDict(params) {
  return request('/api/v1/dict/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function updateDictItem(params) {
  return request('/api/v1/dict/item/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
