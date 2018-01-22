import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent(username) {
  return request(`/api/currentUser/${username}`);
}
