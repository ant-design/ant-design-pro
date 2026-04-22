import { request } from '@umijs/max';
import type { TagType } from './data';

export async function queryTags(): Promise<{ data: { list: TagType[] } }> {
  return request('/api/tags');
}

const GEO_DATA_URL =
  'https://gw.alipayobjects.com/os/bmw-prod/c5dba875-b6ea-4e88-b778-66a862906c93.json';

export async function queryMapGeo(): Promise<Record<string, unknown>[]> {
  const res = await fetch(GEO_DATA_URL);
  if (!res.ok) throw new Error('Fetch geoData failed');
  return res.json();
}
