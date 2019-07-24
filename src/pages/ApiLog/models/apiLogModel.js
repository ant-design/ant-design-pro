import { logList,logItemList,apiListBySearch } from '@/services/apiLogService';

export default {
  namespace: 'apiLogModel',

  state: {
    logList:{},
    logItemList:{}
  },

  effects: {
    *logList({ payload ,callback}, { call, put }) {
      // console.log('payload', JSON.stringify(payload));
      const apiId = payload.data.info.apiId;
      if(apiId){
        payload.data.info.apiId = apiId.key;
      }
      const response = yield call(logList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    *logItemList({ payload , callback}, { call, put }) {
      // console.log('payload', JSON.stringify(payload));
      const response = yield call(logItemList, payload);
      yield put({
        type: 'saveItem',
        payload: response,
      });
      if (callback) callback(response);
    },
    *apiListBySearch({ payload , callback}, { call, put }) {
      // console.log('payload', JSON.stringify(payload));
      const newPayload = { ...payload, newTime: new Date() };
      const response = yield call(apiListBySearch, newPayload);
      yield put({
        type: 'saveItem',
        payload: response,
      });
      if (callback) callback(response);
    },
  },

  reducers: {
    save(state, action) {
      const data = action.payload ? action.payload.data : [];
      // groupList.unshift({"groupId": null, "groupName": "All"});
      return {
        ...state,
        logList:data,
      };
    },
    saveItem(state, action) {
      const data = action.payload ? action.payload.data : [];
      // groupList.unshift({"groupId": null, "groupName": "All"});
      return {
        ...state,
        logItemList:data,
      };
    },
  },
};
