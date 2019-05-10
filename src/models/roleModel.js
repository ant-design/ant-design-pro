// import { roleList } from '../services/userService';
import {list} from "../services/uniCompService";

export default {
  namespace: 'roleModel',

  state: {
    roleList: [],
  },

  effects: {
    *allRoleList({ payload ,callback}, { call, put }) {
      const params = {
        tableName:'sys_role',
        data:{
          info:{
            // status: 'A',
            pageNo: 1,
            pageSize: 999,
          }
        }
      };

      const response = yield call(list, params);
      console.log("response in role model:",response);
      yield put({
        type: 'save',
        action: {payload,response,}
      });
      if (callback) callback(response);
    },
  },
  reducers: {
    save(state, { action }) {
      console.log("response in role model reducers:",action);
      const oriRoleList=action.response&&action.response.data ? action.response.data.records : [];

      const roleList=action.payload.setDisabled?oriRoleList.map(item => {
        const itemTemp = item;
        // // console.log("======:",itemTemp.name === key,key,itemTemp.name);
        itemTemp.disabled=itemTemp.status !== 'A';
        return itemTemp;
      }):oriRoleList;

      return {
        ...state,
        roleList,
      };
    },
  },
};
