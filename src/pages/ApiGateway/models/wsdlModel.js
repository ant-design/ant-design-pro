import { queryWsdlList,saveWsdl,saveAuth,saveBatchApi,authDetail,parseWsdl } from '@/services/wsdlService';
import constants from '@/utils/constUtil';

const { STATUS } = constants;

export default {
  namespace: 'wsdlModel',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    wsdlList:[],
    wsdl:{},
  },

  effects: {
    *fetchWsdlList({ payload ,callback}, { call, put }) {
      const response = yield call(queryWsdlList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    *fetchWsdlListForSelectView({ payload ,callback}, { call, put }) {
      const response = yield call(queryWsdlList, payload);
      // console.log("fetchWsdlListForSelectView:",response);
      yield put({
        type: 'saveForSelectView',
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
      const data = action.payload ? action.payload.data : {};;
      return {
        ...state,
        wsdlList:data,
      };
    },
    saveForSelectView(state, action) {
      const data = action.payload ? action.payload.data : {};
      const records=data.records||[];
      const wsdlList = records.filter(item => item.status === STATUS.A);
      return {
        ...state,
        wsdlList,
      };
    },
  },
};
