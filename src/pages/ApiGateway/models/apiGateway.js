import { queryApi, removeApi, addApi, updateApi } from '@/services/conf';

export default {
  namespace: 'apiGateway',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      console.log('payload', payload);
      const response = yield call(queryApi, payload);

      console.log('response', response);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addApi, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call }) {
      console.log('payload', payload);
      const response = yield call(removeApi, payload);
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
      console.log('response', response);
      if (callback) callback(response);
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateApi, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
