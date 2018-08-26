import request from '@/utils/request';
import { getNoUndefinedString } from '@/utils/utils';
//获取组织信息
export async function getModule(params) {
  return request(`/module/get/${getNoUndefinedString(params.id)}`);
}
// 加载组织列表
export async function listModule(params) {
  return request(`/module/list/${getNoUndefinedString(params)}`);
}
// 新增/编辑组织信息
export async function editModule(params) {
  return request('/module/edit', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 排序组织信息
export async function sortModule(params) {
  return request('/module/sort', {
    method: 'POST',
    body: params,
  });
}
// 根据ID删除组织
export async function deleteModule(params) {
  return request('/module/del', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 校验path唯一性
export async function checkUnique(params) {
  return request('/module/checkUnique', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
