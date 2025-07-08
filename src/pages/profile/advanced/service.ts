import { request } from '@umijs/max';

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}
