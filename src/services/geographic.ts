import request from '@/utils/request';

export async function queryProvince(): Promise<any> {
  return request('/api/geographic/province');
}

export async function queryCity(province: string): Promise<any> {
  return request(`/api/geographic/city/${province}`);
}
