import { notification } from 'antd';
import router from 'umi/router';
import * as AppInfo from '@/common/config/AppInfo';
import ax from './axiosWrap';
import cookie from "react-cookies";
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.data = newOptions.body;
    } else {
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }
  const config = {
    url: AppInfo.request_prefix+url,
    ...newOptions,
  };

  if('/auth/login' === url ){
    config.headers ={
      'Authorization': 'login'
    }
  }else {
    config.headers ={
      'Authorization': "Bearer" + (cookie.load("eva_token")?cookie.load("eva_token"):'')
    }
  }
  return ax
    .request(config)
    .then(response => {
      return response.data;
    })
    .catch(e => {
      const response = e.response;
      const status = response.status;

      const errortext = response.statusText ? response.statusText : codeMessage[response.status];
      const url = response.config.url;

      notification.error({
        message: `请求错误 : ${url}`,
        description: errortext ? errortext : '服务器错误',
      });

      if (status === 401) {
        window.g_app._store.dispatch({
          type: 'login/logout',
        });
        return;
      }
      if (status === 403) {
        router.push('/exception/403');
        return;
      }
      if (status <= 504 && status >= 500) {
        router.push('/exception/500');
        return;
      }
      if (status >= 404 && status < 422) {
        router.push('/exception/404');
      }
    });
}
