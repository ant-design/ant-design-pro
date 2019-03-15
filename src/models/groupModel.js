import { allGroupList } from '../services/groupService';

export default {
  namespace: 'groupModel',

  state: {
    groupList: [],
  },

  effects: {
    *allGroupList({ payload }, { call, put }) {
      const response = yield call(allGroupList, payload);
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
        groupList: action.payload ? action.payload.data : [],
      };
    },
  },
};
