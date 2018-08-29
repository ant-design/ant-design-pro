import request from '@/utils/request';

export default async function query(code) {
  return request(`/api/${code}`);
}
