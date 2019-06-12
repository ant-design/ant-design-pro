import { refreshCache } from '@/services/sysDataService';

export default {
  namespace: 'adminModel',

  state: {
    status: undefined,
    message:undefined,
  },

  effects: {
    * refreshCache(_, {call, put}) {
      const response = yield call(refreshCache);
      console.log(response);
      yield put({
        type: 'changeCacheStatus',
        payload: response,
      });
    },
  },

  reducers: {
    changeCacheStatus(state, { payload }) {
      const status = payload.code === '200' ? 'success' : 'error';
      const {msg} = payload;
      return {
        ...state,
        status,
        message:msg,
      };
    },
  },
};
