import { queryBasicProfile, queryAdvancedProfile } from '../services/api';

export default {
  namespace: 'profile',

  state: {
    basicGoods: [],
    basicLoading: true,
    advancedOperation1: [],
    advancedOperation2: [],
    advancedOperation3: [],
    advancedLoading: true,
  },

  effects: {
    *fetchBasic({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: { basicLoading: true },
      });
      const response = yield call(queryBasicProfile);
      yield put({
        type: 'show',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: { basicLoading: false },
      });
    },
    *fetchAdvanced({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: { advancedLoading: true },
      });
      const response = yield call(queryAdvancedProfile);
      yield put({
        type: 'show',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: { advancedLoading: false },
      });
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    changeLoading(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
