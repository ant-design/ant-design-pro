import {allGroupList} from '../services/sysDataService';
import constants from '@/utils/constUtil';

const { STATUS } = constants;
export default {
  namespace: 'groupModel',

  state: {
    groupList: [],
  },

  effects: {
    * allGroupList({callback}, {call, put}) {
      const response = yield call(allGroupList);
      if (callback) {
        const data = response && response.data ? response.data : [];
        const groupList = data.filter(item => item.status === STATUS.A);
        callback(groupList);
      }
      ;
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
