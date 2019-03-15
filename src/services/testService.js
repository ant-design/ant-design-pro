import request from '@/utils/request';
import { stringify } from 'qs';
import '../utils/const';

const ConstUtil = global.const;
export async function queryTest2List() {
  return request(`${ConstUtil.PREFIX_PATH}/test/test2list`);
}

export async function queryTest2Detail(params) {
  return request(`${ConstUtil.PREFIX_PATH}/test/test2detail?${stringify(params)}`);
}

export async function allEnumList() {
  return request(`${ConstUtil.PREFIX_PATH}/baseinfo/sys/allEnumList`);
}
