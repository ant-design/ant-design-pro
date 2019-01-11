import { routerRedux } from 'dva/router';
import { fakeRegister } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'register',

  state: {},

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(fakeRegister, payload);
      const { mail } = payload;
      const { status } = response;
      if (status === 'ok') {
        setAuthority('user');
        reloadAuthorized();
        yield put(
          routerRedux.push({
            pathname: '/user/register-result',
            state: {
              account: mail,
            },
          })
        );
      }
    },
  },
};
