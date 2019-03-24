import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { postLogin, getFakeCaptcha } from '@/services/api';
import { queryCurrent } from '@/services/user';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import token from '../utils/token';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(postLogin, payload);
      response.status = true;
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      yield put({
        type: 'currenUser',
        payload: response.data.user,
      });
      // Login successfully
      token.save(response.data.token.accessToken);
      token.saveUID(response.data.user.id);
      
      if (response.data !== null) {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      token.remove();
      token.removeUID();

      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
    *fetchCurrentUser(_, { call, put }) {
      if(token.get() == null || token.get() === ''){
          console.log("error token null")
          return;
      }
      var payload = token.getUID()
      const response = yield call(queryCurrent, payload);

      if (response) {
        response.status = true;
        reloadAuthorized();
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        yield put({
          type: 'currenUser',
          payload: response,
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {

      setAuthority(payload.role ? payload.role : payload.data && payload.data.user && payload.data.user.role ? payload.data.user.role : "guest");
      return {
        ...state,
        status: payload.status,
        // type: payload.type,
      };
    },
    currenUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'fetchCurrentUser' });
    },
  },
};
