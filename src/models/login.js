import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getFakeCaptcha, queryCurrent } from '@/services/userService';
import { setAuthority, setUser } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      console.log('====', payload);
      const response = yield call(fakeAccountLogin, payload);
      console.log('=====login response in loginModel:', response);
      response.code = '200';
      yield put({
        type: 'changeLoginStatus',
        payload: response,
        loginType: payload.type,
      });
      const status = response.code && response.code === '200' ? 'ok' : 'error';
      // Login successfully
      if (status === 'ok') {
        console.log('login response in loginModel:', 1);
        reloadAuthorized();
        console.log('login response in loginModel:', 12);
        const urlParams = new URL(window.location.href);
        console.log('login response in loginModel:', 13);
        const params = getPageQuery();
        console.log('login response in loginModel:', 14);

        const currentUser = yield call(queryCurrent);
        setUser(currentUser.data);

        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
              console.log('login response in loginModel:', 15);
            }
          } else {
            redirect = null;
          }
        }
        console.log('login response in loginModel:', 16);
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: ['guest'],
        },
      });
      reloadAuthorized();
      // redirect
      if (window.location.pathname !== '/user/login') {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload, loginType }) {
      const status = payload.code === '200' ? 'ok' : 'error';
      console.log(status, loginType, payload);
      if (payload.code === '200' && payload.data && payload.data.currentAuthority) {
        setAuthority(payload.data.currentAuthority);
        // setAuthority(['admin','manager','user']);
      } else {
        setAuthority(['guest']);
      }
      return {
        ...state,
        status,
        type: loginType,
      };
    },
  },
};
