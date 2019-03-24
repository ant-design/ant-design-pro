import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent(params) {
  return request(`/api/v1/users/${params}`);
}



export async function queryCustomer() {
  return request(`/api/v1/users?role=user_customer`);
}


export async function removeCustomer(params) {
  return request('/api/v1/sale/product', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addCustomer(params) {
  return request('/api/v1/sale/product', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateCustomer(params = {}) {
  return request(`/api/v1/sale/product?${stringify(params.query)}`, {
    method: 'POST',
    body: {
      ...params.body,
      method: 'update',
    },
  });
}
