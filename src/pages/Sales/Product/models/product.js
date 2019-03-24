import { querySaleProduct, removeSaleProduct, addSaleProduct, updateSaleProduct } from '@/services/api';

export default {
  namespace: 'saleProduct',

  state: {
    // data: {
    //   list: [],
    //   pagination: {},
    // },
  },

  effects: {
    
    *fetch({ payload }, { call, put }) {
      const response = yield call(querySaleProduct, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addSaleProduct, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeSaleProduct, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateSaleProduct, payload);
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
