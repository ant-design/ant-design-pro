import { roleList } from '../services/userService';

export default {
  namespace: 'roleModel',

  state: {
    roleList: [],
  },

  effects: {
    *allRoleList({ payload ,callback}, { call, put }) {
      const response = yield call(roleList, payload);
      console.log("response in role model:",response);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
  },
  reducers: {
    save(state, action) {
      console.log("response in role model reducers:",action.payload.data);
      return {
        ...state,
        roleList: action.payload ? action.payload.data : [],
      };
    },
  },
};
