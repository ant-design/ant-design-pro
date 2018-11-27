import { query, remove, add } from '../services/uniApi';

export default {
  namespace: 'uniComp',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      console.log('payload:', payload);
      const response = yield call(query, payload);
      console.log('response:', response);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call }) {
      console.log('postinfo add:', payload);
      const response = yield call(add, payload);
      console.log('postinfo response add:', response);
      if (callback) callback(response);
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(remove, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
  },

  reducers: {
    save(state, action) {
      console.log('action:', action.payload, state);
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
