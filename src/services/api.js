import { stringify } from 'qs';
import request from '@/utils/request';

// 获取用户菜单
export async function getUserMenu(params) {
  return request(`/module/listModuleByAttr?status=0001`);
}

export async function queryProjectNotice() {
  return request('/project/notice');
}

export async function queryActivities() {
  return request('/activities');
}

export async function queryRule(params) {
  return request(`/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request('/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/fake_chart_data');
}

export async function queryTags() {
  return request('/tags');
}

export async function queryBasicProfile() {
  return request('/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

/**
 * 用户登录
 * @param params
 * @returns {Promise<void>}
 */
export async function fakeAccountLogin(params) {
  return request('/auth/login', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/notices');
}

export async function getFakeCaptcha(mobile) {
  return request(`/captcha?mobile=${mobile}`);
}
