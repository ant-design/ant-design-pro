import { request } from '@umijs/max';
import type { CurrentUser, GeographicItemType } from './data';

export async function queryCurrent(): Promise<{ data: CurrentUser }> {
  return request('/api/accountSettingCurrentUser');
}

export async function queryProvince(): Promise<GeographicItemType[]> {
  return request('/api/geographic/province').then(({ data }) => data);
}

export async function queryCity(
  province: string,
): Promise<GeographicItemType[]> {
  return request(`/api/geographic/city/${encodeURIComponent(province)}`).then(
    ({ data }) => data,
  );
}

export async function query() {
  return request('/api/users');
}
