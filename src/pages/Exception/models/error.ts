import queryError from '@/services/error';
import { Effect } from 'dva';
import { Reducer } from 'redux';

export interface IErrorModelState {
  error: string;
  isloading: boolean;
}

export interface IErrorModel {
  namespace: 'error';
  state: IErrorModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    trigger: Reducer<any>;
  };
}

const ErrorModel: IErrorModel = {
  namespace: 'error',

  state: {
    error: '',
    isloading: false,
  },

  effects: {
    *query({ payload }, { call, put }) {
      yield call(queryError, payload.code);
      yield put({
        type: 'trigger',
        payload: payload.code,
      });
    },
  },

  reducers: {
    trigger(state, action) {
      return {
        error: action.payload,
      };
    },
  },
};

export default ErrorModel;
