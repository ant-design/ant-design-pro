import request from '@/utils/request';

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function queryFakeList(params: { count: number }) {
  return request('/api/fake_list', {
    params,
  });
}
