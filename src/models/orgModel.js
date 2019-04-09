import { orgList } from '../services/sysDataService';

export default {
  namespace: 'orgModel',

  state: {
    orgList: [],
  },

  effects: {
    *allOrgList({ payload ,callback}, { call, put }) {
      const response = yield call(orgList, payload);
      console.log("response in org model:",response);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
  },
  reducers: {
    save(state, action) {
      console.log("response in org model reducers:",action.payload.data);
      return {
        ...state,
        orgList: action.payload ? action.payload.data : [],
      };
    },
  },
};
