import request from '@/utils/request';

export default async function queryError(code: number): Promise<any> {
  return request(`/api/${code}`);
}
