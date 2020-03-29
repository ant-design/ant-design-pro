import request from 'umi-request';

export async function queryTags() {
  return request('/api/tags');
}
