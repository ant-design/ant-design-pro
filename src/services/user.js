import request from '../utils/request';

const url = 'http://localhost:8011';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request(`${url}/currentUser`);
}
