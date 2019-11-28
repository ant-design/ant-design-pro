import request from '@/utils/request';

export async function fakeSubmitForm(params: any) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}
