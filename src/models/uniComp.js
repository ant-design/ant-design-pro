import {list, save, statusBatch} from '../services/uniCompService';
import {conversion, conversionReq} from "../pages/util";

export default {
  namespace: 'uniComp',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *list({ payload }, { call, put }) {
      console.log('payload:', payload);
      const req=conversionReq(payload);
      const response = yield call(list, req);
      console.log('response:', response);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *save({ payload, callback }, { call }) {
      console.log('postinfo add:', payload);
      const req=conversionReq(payload);
      const response = yield call(save, req);
      console.log('postinfo response add:', response);
      if (callback) callback(response);
    },
    *statusBatch({ payload, callback }, { call }) {
      console.log('sysdata statusBatch in Model:', payload);
      const req=conversionReq(payload);
      const response = yield call(statusBatch, req);
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
      if (callback) callback(response);
    },
  },

  reducers: {
    save(state, action) {
      console.log("--------3",action.payload);
      const response = conversion(action.payload.data);
      console.log("--------4",response);
      return {
        ...state,
        data: response,
      };
    },
  },
};
