import React from 'react';
import { Settings as LayoutSettings } from '@ant-design/pro-layout';

import { notification } from 'antd';
import { history, RequestConfig, LayoutConfigProps } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { queryCurrent } from './services/user';

import defaultSettings from '../config/defaultSettings';

export async function getInitialState(): Promise<{
  currentUser?: API.CurrentUser;
  menu?: any[];
  settings?: LayoutSettings;
}> {
  // 如果是登录页面，不执行
  if (history.location.pathname !== '/user/login') {
    try {
      const currentUser = await queryCurrent();

      if (!currentUser) {
        throw new Error('未登录！');
      }
      return {
        currentUser,
        settings: defaultSettings,
        // 设置要追加的权限，也可以全部替换，配置 renderMenuData
        menu: [{
          path: '/welcome',
          name: 'welcome',
          icon: 'smile',
          access: 'canAdmin',
        },]
      };
    } catch (error) {
      history.push('/user/login');
    }
  }
  return {
    settings: defaultSettings,
  };
}

export const accessLayout: LayoutConfigProps = {
  // @ts-ignore
  title: 'Ant Design Pro',
  siderWidth: 208,
  rightContentRender: () => <RightContent />,
  disableContentMargin: false,
  footerRender: () => <Footer />,
  menuHeaderRender: undefined,
  // 配置服务端菜单的使用方式，默认是全部替换
  renderMenuData: (localMenu, serverMenu) => {
    return localMenu.map(item => {
      let trueItem = item;
      for (let key = 0; key < serverMenu.length; key++) {
        if (item.path === serverMenu[key].path) {
          trueItem = serverMenu[key];
          break;
        }
      }
      return trueItem;
    })
  },
  ...defaultSettings,
};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }

  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
};

export const request: RequestConfig = {
  errorHandler,
};
