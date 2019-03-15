import { apiList, apiStatusBatch, addApi, updateApi } from '@/services/apiGatewayService';

export default {
  namespace: 'apiGatewayModel',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *apiList({ payload }, { call, put }) {
      console.log('payload', payload);
      const response = yield call(apiList, payload);

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
    *apiStatusBatch({ payload, callback }, { call }) {
      console.log('payload', payload);
      const response = yield call(apiStatusBatch, payload);
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
