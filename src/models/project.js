import { queryProjectNotice } from '../services/api';

export default {
  namespace: 'project',

  state: {
    notice: [],
    loading: true,
  },

  effects: {
    *fetchNotice(_, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryProjectNotice);
      yield put({
        type: 'saveNotice',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
  },

  reducers: {
    saveNotice(state, action) {
      return {
        ...state,
        notice: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
};
