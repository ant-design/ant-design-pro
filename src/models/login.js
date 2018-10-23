import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import cookie from 'react-cookies';

const USER_KEY = "eva_user";
const TOKEN_KEY = "eva_token";

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // 登录鉴权
      if (response && response.success) {
        // 拿到token 存cookie
        console.info("response token is : " + response.data.token);
        cookie.save(TOKEN_KEY, response.data.token, {
          maxAge: 60 * 60 * 24,
        });
        localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));

        // 更新用户菜单状态
        if (response.data.user.modules && response.data.user.modules.length > 0) {
          yield put({
            type: 'global/updateState',
            payload: {
              currentUser: {
                name: response.data.user.name,
                avatar: response.data.user.avatar,
              },
              menus: response.data.user.modules,
            },
          });
        }
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      } else {
        yield put({
          type: 'updateState',
          payload: {
            status: 'error',
            type: 'account',
          },
        });
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      // 删除token
      cookie.remove(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
