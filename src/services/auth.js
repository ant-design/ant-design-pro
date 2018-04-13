import request from '../utils/request';

export async function getAuthMenus() {
  return request('/api/menus');
}
