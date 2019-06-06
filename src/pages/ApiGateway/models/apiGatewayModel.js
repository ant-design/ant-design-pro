import { apiList, apiStatusBatch } from '@/services/apiGatewayService';
import { conversion } from '../../util';

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
      console.log('payload', JSON.stringify(payload));
      const newPayload = { ...payload, newTime: new Date() };
      const response = yield call(apiList, newPayload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *apiStatusBatch({ payload, callback }, { call }) {
      console.log('payload-----------', payload);
      const response = yield call(apiStatusBatch, payload);
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
      console.log('response------------', response);
      if (callback) callback(response);
    },
  },

  reducers: {
    save(state, action) {
      console.log('--------1', action.payload);
      const response = conversion(action.payload.data);
      console.log('--------2', response);
      return {
        ...state,
        data: response,
      };
    },
  },
};
