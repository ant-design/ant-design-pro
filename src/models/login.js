import { routerRedux } from 'dva/router';
import { fakeAccountLogin } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

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
      // Login successfully
      if (response.status === 'ok') {
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      }
    },
    * loginSuccessRedirect({ payload }) {
      try {
        const { locationState } = payload;
        const getRedirectLocation = (state) => {
          if (state && state.from) {
            // Skip exception page
            if (['/exception/403', '/exception/404', '/exception/500'].indexOf(state.from.pathname) !== -1) {
              if (state.from.state) {
                return getRedirectLocation(state.from.state);
              } else {
                return null;
              }
            } else {
              let to = state.from.pathname;
              if (state.from.search) {
                to += state.from.search;
              }
              return to;
            }
          } else {
            return null;
          }
        };
        const redirectLocation = getRedirectLocation(locationState);
        if (redirectLocation !== null) {
          // get location pathname
          const urlParams = new URL(window.location.href);
          urlParams.searchParams.set('redirect', redirectLocation);
          // add the parameters in the url
          window.history.replaceState(null, null, urlParams.href);
        }
      } catch (e) {
        // eslint-disable-line
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
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
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
