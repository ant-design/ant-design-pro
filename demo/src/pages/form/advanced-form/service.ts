import { request } from 'umi';

export async function fakeSubmitForm(params: any) {
  return request('/api/advancedForm', {
    method: 'POST',
    data: params,
  });
}
