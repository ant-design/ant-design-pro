import {list} from '../services/uniCompService';
import {conversion} from "../pages/util";

export default {
  namespace: 'privilegeModel',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *list({ payload }, { call, put }) {
      console.log('payload:', JSON.stringify(payload));
      const response = yield call(list, payload);
      console.log('response:', response);
      yield put({
        type: 'saveData',
        payload: response,
      });
    },
  },

  reducers: {
    saveData(state, action) {
      const data=action.payload?action.payload.data:null;
      const response = conversion(data);
      return {
        ...state,
        data: response,
      };
    },
  },
};
