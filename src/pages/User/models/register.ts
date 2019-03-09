import { fakeRegister } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { Effect } from 'dva';
import { Reducer } from 'redux';

export interface IRegisterModelState {
  status: undefined | string;
}

export interface IRegisterModel {
  namespace: 'register';
  state: IRegisterModelState;
  effects: {
    submit: Effect;
  };
  reducers: {
    registerHandle: Reducer<any>;
  };
}

const RegisterModel: IRegisterModel = {
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
