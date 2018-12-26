import { getMasterData } from '../services/conf';

export default {
  namespace: 'masterData',

  state: {
    data: {
      rows: [],
    },
  },

  effects: {
    *getMasterData({ payload }, { call, put }) {
      const response = yield call(getMasterData, payload);
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
        data: action.payload ? action.payload.data : {},
      };
    },
  },
};
