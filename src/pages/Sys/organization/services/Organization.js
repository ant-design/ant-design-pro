import request from '@/utils/request';
import { getNoUndefinedString } from '@/utils/utils';
import { stringify } from 'qs';
//获取组织信息
export async function getOrg(params) {
  return request(`/organization/get/${getNoUndefinedString(params.id)}`);
}
// 加载组织列表
export async function listOrg(params) {
  return request(`/organization/list/${getNoUndefinedString(params)}`);
}
// 根据属性加载组织列表
export async function listOrgByAttr(params) {
  return request(`/organization/listOrgByAttr/?${stringify(params)}`);
}
// 排序组织信息
export async function sortOrg(params) {
  return request('/organization/sort', {
    method: 'POST',
    body: params
  });
}
// 新增/编辑组织信息
export async function editOrg(params) {
  return request('/organization/edit', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 切换可用状态
export async function switchStatus(params){
  return request('/organization/switchStatus', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 根据ID删除组织
export async function deleteOrg(params) {
  return request('/organization/del', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 校验path唯一性
export async function checkUnique(params) {
  return request('/organization/checkUnique', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
