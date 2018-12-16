import { fakePasswordChange } from '@/services/api';
import { showMessageByResponse } from '@/utils/utils';

export default {
  namespace: 'password',

  state: {
    status: undefined,
  },

  effects: {
    *change({ payload }, { call, put }) {
      const response = yield call(fakePasswordChange, payload);
      showMessageByResponse(response);
      yield put({
        type: 'passwordChangeHandle',
        payload: response,
      });
    },
  },

  reducers: {
    passwordChangeHandle(state, { payload }) {
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
