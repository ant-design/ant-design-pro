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
      // save userName to localStorage
      userManger.save(payload.userName);
      // Login successfully
      if (response.status === 'ok') {
        // reload userinfo
        yield put({
          type: 'user/fetchCurrent',
          payload: payload.userName,
        });
        yield put(routerRedux.push('/'));
      }
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
          },
        });
        yield put(routerRedux.push('/user/login'));
      }
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
