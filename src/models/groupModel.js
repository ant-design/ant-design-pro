import { allGroupList } from '../services/sysDataService';
import constants from '@/utils/constUtil';

const { STATUS } = constants;
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
      const data = action.payload ? action.payload.data : [];
      const groupList = data.filter(item => item.status === STATUS.A);
      // groupList.unshift({"groupId": null, "groupName": "All"});
      return {
        ...state,
        groupList,
      };
    },
  },
};
