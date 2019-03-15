import { queryTest2List, queryTest2Detail } from '@/services/testService';

export default {
  namespace: 'testModel',
  state: {
    data: {
      list: [],
      detail: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryTest2List, payload);
      yield put({
        type: 'saveList',
        payload: response,
      });
    },
    *detail({ payload, callback }, { call, put }) {
      const response = yield call(queryTest2Detail, payload);
      yield put({
        type: 'saveDetail',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    saveList(state, action) {
      const response = { list: action.payload };

      console.log('saveTestList');
      return {
        ...state,
        data: response,
      };
    },
    saveDetail(state, action) {
      const response = { list: action.payload };
      return {
        ...state,
        data: response,
      };
    },
  },
};
