import { orgList } from '../services/sysDataService';
import constants from '@/utils/constUtil';

const { STATUS } = constants;
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
      const data=action.payload ? action.payload.data : [];
      const filterOrgList=data.filter((item)=>(item.status===STATUS.A));
      return {
        ...state,
        orgList:filterOrgList,
      };
    },
  },
};
