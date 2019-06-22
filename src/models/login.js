import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/userService';
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
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
        loginType: payload.type,
      });
      const status = response.code && response.code === '200' ? 'ok' : 'error';
      // Login successfully
      if (status === 'ok') {
        const {id,username}=response.data;
        const user={id,username};
        setUser(user);
        reloadAuthorized();
        let url="/user/loading";
        const params = getPageQuery();


        const { redirect } = params;
        console.log(redirect);
        if (redirect) {
          url+=`?redirect=${redirect}`;
        }
        yield put(routerRedux.replace(url));
      }
      // else{
      //   message.error(response.msg);
      // }
    },

    // *getCaptcha({ payload }, { call }) {
    //   yield call(getFakeCaptcha, payload);
    // },

    *getCaptcha() {
      yield '111';
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
      // console.log(status, loginType, payload);
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
