import { request } from '@umijs/max';
import type { TagType } from './data';

export async function queryTags(): Promise<{ data: { list: TagType[] } }> {
  return request('/api/tags');
}

const GEO_DATA_URL =
  'https://gw.alipayobjects.com/os/bmw-prod/c5dba875-b6ea-4e88-b778-66a862906c93.json';
const GRID_DATA_URL =
  'https://gw.alipayobjects.com/os/bmw-prod/8990e8b4-c58e-419b-afb9-8ea3daff2dd1.json';

export async function queryMapGeo(): Promise<Record<string, unknown>[]> {
  const res = await fetch(GEO_DATA_URL);
  if (!res.ok) throw new Error('Fetch geoData failed');
  return res.json();
}

export async function queryMapGrid(): Promise<Record<string, unknown>[]> {
  const res = await fetch(GRID_DATA_URL);
  if (!res.ok) throw new Error('Fetch gridData failed');
  return res.json();
}
