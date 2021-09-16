import { request } from 'umi';

export async function fakeSubmitForm(params: any) {
  return request('/api/stepForm', {
    method: 'POST',
    data: params,
  });
}
