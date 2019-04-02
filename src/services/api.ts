import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryProjectNotice(): Promise<any> {
  return request('/api/project/notice');
}

export async function queryActivities(): Promise<any> {
  return request('/api/activities');
}

export async function queryRule(params: any): Promise<any> {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params: any): Promise<any> {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: any): Promise<any> {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {} as any): Promise<any> {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params: any): Promise<any> {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}

export async function fakeChartData(): Promise<any> {
  return request('/api/fake_chart_data');
}

export async function queryTags(): Promise<any> {
  return request('/api/tags');
}

export async function queryBasicProfile(id: string | number): Promise<any> {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile(): Promise<any> {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params: any): Promise<any> {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params: any): Promise<any> {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params: any): Promise<any> {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params: any): Promise<any> {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params: any): Promise<any> {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function fakeRegister(params: any): Promise<any> {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}

export async function queryNotices(params = {} as any): Promise<any> {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile: string | number): Promise<any> {
  return request(`/api/captcha?mobile=${mobile}`);
}
