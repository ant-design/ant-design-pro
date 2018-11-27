import { stringify } from 'qs';
import request from '../utils/request';

export async function sug(params) {
  return request(`/uniComp/sug.do?${stringify(params)}`);
}
export async function query(params) {
  // return request(`/uniComp/queryList.do?${stringify(params)}`);
  return request('/uniComp/queryList.do', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function remove(params) {
  return request('/uniComp/postInfo.do', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function add(params) {
  return request('/uniComp/postInfo.do', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
