import { querySaleOrders, querySaleOrderDetail, addSaleOrder, removeSaleOrder, updateSaleOrder } from '@/services/api';

export default {
  namespace: 'saleOrder',

  state: {
    // data: {
    //   list: [],
    //   pagination: {},
    // },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(querySaleOrders, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addSaleOrder, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeSaleOrder, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateSaleOrder, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *detail({ payload }, { call, put }) {
      // console.log(payload)
      const response = yield call(querySaleOrderDetail, payload);
      yield put({
        type: 'save',
        payload: response,
      });
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
