// import { stringify } from 'qs';
import request from '@/utils/request';
import constants from '@/utils/constUtil';

const { PREFIX_PATH } = constants;

export async function queryWsdlList(params) {
  console.log('params in queryApi:', params,`${PREFIX_PATH}/baseInfo/wsdl/wsdlList`);
  return request(`${PREFIX_PATH}/baseInfo/wsdl/wsdlList`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function saveWsdl(params) {
  console.log('params in queryApi:', params,`${PREFIX_PATH}/baseInfo/wsdl/saveWsdl`);
  return request(`${PREFIX_PATH}/baseInfo/wsdl/saveWsdl`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function saveAuth(params) {
  console.log('params in queryApi:', params,`${PREFIX_PATH}/baseInfo/wsdl/saveAuth`);
  return request(`${PREFIX_PATH}/baseInfo/wsdl/saveAuth`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
export async function saveBatchApi(params) {
  console.log('params in queryApi:', params,`${PREFIX_PATH}/baseInfo/wsdl/saveBatchApi`);
  return request(`${PREFIX_PATH}/baseInfo/wsdl/saveBatchApi`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function authDetail(params) {
  console.log('params in queryApi:', params,`${PREFIX_PATH}/baseInfo/wsdl/authDetail?wsdlId=${params.wsdlId}`);
  return request(`${PREFIX_PATH}/baseInfo/wsdl/authDetail?wsdlId=${params.wsdlId}`);
}

export async function parseWsdl(params) {
  console.log('params in queryApi:', params,`${PREFIX_PATH}/baseInfo/wsdl/parseWsdl?wsdlId=${params.wsdlId}`);
  return request(`${PREFIX_PATH}/baseInfo/wsdl/parseWsdl?wsdlId=${params.wsdlId}`);
}

export async function fileWsdl(params) {
  console.log('params in queryApi:', params,`${PREFIX_PATH}/baseInfo/file/${params.folder}/list`);
  return request(`${PREFIX_PATH}/baseInfo/file/${params.folder}/list`);
}

export async function removeFile(params) {
  console.log('params in queryApi:', params,`${PREFIX_PATH}/baseInfo/file/removeFile?fileName=${params.fileName}&folder=${params.folder}`);
  return request(`${PREFIX_PATH}/baseInfo/file/removeFile?fileName=${params.fileName}&folder=${params.folder}`);
}
