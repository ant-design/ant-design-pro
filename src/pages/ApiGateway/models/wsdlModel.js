import { wsdlList,saveWsdl,saveAuth,saveBatchApi,authDetail,parseWsdl } from '@/services/wsdlService';

export default {
  namespace: 'wsdlModel',

  state: {
    logList:{},
    logItemList:{}
  },

  effects: {
    *wsdlList({ payload ,callback}, { call, put }) {
      const response = yield call(wsdlList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    *saveWsdl({ payload , callback}, { call, put }) {
      // console.log('payload', JSON.stringify(payload));
      const response = yield call(saveWsdl, payload);
      if (callback) callback(response);
    },
    *saveAuth({ payload , callback}, { call, put }) {
      // console.log('payload', JSON.stringify(payload));
      const response = yield call(saveAuth, payload);
      if (callback) callback(response);
    },
    *saveBatchApi({ payload , callback}, { call, put }) {
      // console.log('payload', JSON.stringify(payload));
      const response = yield call(saveBatchApi, payload);
      if (callback) callback(response);
    },
    *authDetail({ payload , callback}, { call, put }) {
      // console.log('payload', JSON.stringify(payload));
      const response = yield call(authDetail, payload);
      if (callback) callback(response);
    },
    *parseWsdl({ payload , callback}, { call, put }) {
      // console.log('payload', JSON.stringify(payload));
      const response = yield call(parseWsdl, payload);
      if (callback) callback(response);
    },
  },

  reducers: {
    save(state, action) {
      const data = action.payload ? action.payload.data : [];
      // groupList.unshift({"groupId": null, "groupName": "All"});
      return {
        ...state,
        logItemList:data,
      };
    },
  },
};
