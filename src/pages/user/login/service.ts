import request from '@/utils/request';
import { FormDataType } from './index';

export async function fakeAccountLogin(params: FormDataType) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
