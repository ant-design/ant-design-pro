import { routerRedux } from 'dva/router';
import { fakeAccountLogin } from '../services/api';
import userManger from '../utils/userManger';

export default {
  namespace: 'login',

  state: {
    userName: undefined,
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
        username: payload.userName,
      });
      // Login successfully
      if (response.status === 'ok') {
        // save userName to localStorage
        userManger.save(payload.userName);
        // reload userinfo
        yield put({
          type: 'user/fetchCurrent',
        });
        yield put(routerRedux.push('/'));
      }
    },
    *logout(_, { put, select }) {
      // get location pathname
      const urlParams = new URL(window.location.href);
      // loading page location is null
      const pathname = yield select((state) => {
        const { location } = state.routing;
        if (location && location.pathname) {
          return location.pathname;
        }
        return '';
      });
      // pathname is not empty and not in the login page;
      if (pathname && !pathname.includes('login')) {
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      }
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
        },
      });
      yield put(routerRedux.push('/user/login'));
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        userName: payload.username,
        type: payload.type,
      };
    },
  },
};
