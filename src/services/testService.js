import request from '@/utils/request';
import { stringify } from 'qs';
import constants from '@/utils/constUtil';

const { PREFIX_PATH } = constants;

export async function queryTest2List() {
  return request(`${PREFIX_PATH}/test/test2list`);
}

export async function queryTest2Detail(params) {
  return request(`${PREFIX_PATH}/test/test2detail?${stringify(params)}`);
}

export async function allEnumList() {
  return request(`${PREFIX_PATH}/baseInfo/sys/allEnumList`);
}
