import request from '@/utils/request';

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}
