// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import type { RequestOptionsInit } from 'umi-request';

/** 发送验证码 POST /api/login/captcha */
export async function getFakeCaptcha(
  params: {
    // query
    /** 手机号 */
    phone?: string;
  },
  options: RequestOptionsInit = {},
) {
  return request<API.FakeCaptcha>('/api/login/captcha', {
    method: 'GET',
    params: {
      ...params,
    },
    ...options,
  });
}
