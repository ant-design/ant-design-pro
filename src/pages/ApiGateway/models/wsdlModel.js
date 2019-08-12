import { queryWsdlList,saveWsdl,saveAuth,saveBatchApi,authDetail,parseWsdl,fileWsdl,removeFile } from '@/services/wsdlService';
import constants from '@/utils/constUtil';
import { conversionWsdl } from '../../util';

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
    fileList:[],
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
      yield put({
        type: 'saveForWsdl',
        payload: response,
      });
      if (callback) callback(response);
    },
    *parseWsdl({ payload , callback}, { call, put }) {
      // console.log('payload', JSON.stringify(payload));
      const response = yield call(parseWsdl, payload);
      if (callback) callback(response);
    },
    *fileWsdl({ payload , callback}, { call, put }) {
      // console.log('payload', JSON.stringify(payload));
      const response = yield call(fileWsdl, payload);
      yield put({
        type: 'saveForUpload',
        payload: response,
      });
      if (callback) callback(response);
    },
    *removeFile({ payload , callback}, { call, put }) {
      // console.log('payload', JSON.stringify(payload));
      const response = yield call(removeFile, payload);
      yield put({
        type: 'saveForUpload',
        payload: response,
      });
      if (callback) callback(response);
    },
  },

  reducers: {
    save(state, action) {
      const data = conversionWsdl(action.payload.data);
      return {
        ...state,
        data,
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
    saveForUpload(state, action) {
      const fileList = action.payload ? action.payload.data : [];
      return {
        ...state,
        fileList
      };
    },
    saveForWsdl(state, action) {
      const wsdl = action.payload ? action.payload.data :{};
      return {
        ...state,
        wsdl
      };
    },
  },
};
