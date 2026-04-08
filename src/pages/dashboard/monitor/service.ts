import { request } from '@umijs/max';
import type { TagType } from './data';

export async function queryTags(): Promise<{ data: { list: TagType[] } }> {
  return request('/api/tags');
}

export async function queryMapGeo() {
  return request('/api/monitor/map-geo');
}

export async function queryMapGrid() {
  return request('/api/monitor/map-grid');
}
