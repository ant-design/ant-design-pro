import request from '@/utils/request';

export async function query() {
  return request('/api/v1/user/page');
}

export async function queryCurrent() {
  return request('/api/v1/auth/currentUser');
}
