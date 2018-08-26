import request from '@/utils/request';
import { getNoUndefinedString } from '@/utils/utils';
// 查询字典列表
export async function listDict() {
  return request('/dict/list');
}
// 查询字典分类
export async function getDict(params) {
  return request(`/dict/get/${getNoUndefinedString(params.id)}`);
}
// 校验编码唯一性
export async function checkUnique(params) {
  return request('/dict/checkUnique', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 删除字典分类
export async function deleteDict(params) {
  return request(`/dict/del/${getNoUndefinedString(params.id)}`);
}
// 删除字典项
export async function deleteDictItem(params) {
  return request(`/dictItem/del/${getNoUndefinedString(params.id)}`);
}
// 新增/编辑字典分类
export async function editDict(params) {
  return request('/dict/edit', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 新增/编辑字典项
export async function editDictItem(params) {
  return request('/dictItem/edit', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
