import { fakeRegister } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { Effect } from '@/models/connect';
import { Reducer } from 'redux';

export interface RegisterModelState {
  status: undefined | string;
}

export interface RegisterModel {
  namespace: 'register';
  state: RegisterModelState;
  effects: {
    submit: Effect;
  };
  reducers: {
    registerHandle: Reducer<RegisterModelState>;
  };
}

const RegisterModel: RegisterModel = {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(fakeRegister, payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      setAuthority('user');
      reloadAuthorized();
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};

export default RegisterModel;
