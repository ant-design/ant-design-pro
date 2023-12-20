import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { history } from '@umijs/max';
import dayjs from 'dayjs';

import { message } from 'antd';

// 与后端约定的响应数据格式
interface ResponseStructure {
  code: number;
  message?: string;
  data?: any;
  config?: any;
  status: number;
}

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: () => {},
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;

      if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        message.error(`${error.message}`);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error('没有反应，请重试！');
      } else {
        // 发送请求时出了点问题
        message.error('请求错误，请重试！');
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      const { headers, url, ...restProps } = config;
      const isLogin = url?.includes('/login');
      const token = localStorage.getItem('RKLINK_OA_TOKEN') || '';
      const time = dayjs(`${new Date()}`).format('YYYYMMDDHHmmsssss');
      return isLogin
        ? config
        : {
            ...restProps,
            url,
            headers: {
              ...headers,
              Authorization: isLogin ? null : token,
              'request-id': time,
            },
          };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const { data, config, status } = response as unknown as ResponseStructure;
      if (config.skipErrorHandler) return response;
      if (status !== 200 || data?.code !== 200) {
        message.error(data?.message || '请求失败！');
      }

      const loginPath = '/user/login';
      // token失效
      if ([403].includes(data?.code)) {
        message.error(data?.message || 'token失效！');
        localStorage.setItem('EVIL_PRO_CLI_TOKEN', '');
        history.replace({
          pathname: loginPath,
        });
      }
      return response;
    },
  ],
};
