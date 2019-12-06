import request from '@/utils/request';

export async function queryTags() {
  return request('/api/tags');
}
