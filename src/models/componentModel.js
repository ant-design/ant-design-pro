import { sug } from '../services/uniApi';

export default {
  namespace: 'componentModel',
  state: {
    data: { ab: 'cc' },
    mutiData: {},
    process: 'init',
  },

  effects: {
    *sug({ payload, callback }, { call, put }) {
      // console.debug("sug payload----",payload);
      const response = yield call(sug, payload);
      // console.debug("sug response----",response);
      yield put({
        type: 'save',
        key: payload.t,
        payload: response,
      });
      if (callback) callback(response);
    },
  },

  reducers: {
    save(state, action) {
      // console.log('action:',state,action,state.mutiData[action.key]);
      const state1 = state;
      state1.mutiData[action.key] = action.payload;
      return {
        ...state1,
        process: 'reducers',
      };
    },
  },
};
