import { routerRedux } from 'dva/router';
import { saveApi } from '@/services/conf';

export default {
  namespace: 'apiCreate',

  state: {
    step: {
      groupId: '0',
      apiName: '语音转码',
      userName: 'Admin',
      consumerServiceType: '1',
      consumerProtocol: 'HTTP',
      consumerMethod: 'POST',
      consumerPath: '/rest/voice',
      producerServiceType: '1',
      producerUrl: 'http://aliyun.com',
      producerPath: '/api/voice',
      producerProtocol: 'HTTP',
      producerSocketTimeout: 20000,
      producerConnectTimeout: 5000,
      // apiService: {
      //   apiId: 1,
      //   name: '语音识别',
      //   serviceType:'rest',
      //   status: '2',
      //   groupId: 2,
      //   actionName: '',
      //   requestUrl: '/rest/voice',
      //   createTime: '2018-05-11 00:00:00',
      //   updateTime: '2018-05-11 00:00:00',
      //   createUser:'Alex',
      // },
      // apiServiceBackend: {
      //   backendId: 1,
      //   serviceType:'rest',
      //   status: '2',
      //   url: 'http://aliyun.com',
      //   reqPath: '2',
      //   socketTimeout: 20000,
      //   connectTimeout: 30000,
      // },
    },
  },

  effects: {
    *submitStepForm({ payload }, { call, put }) {
      yield call(saveApi, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put(routerRedux.push('/apiGateway/apiCreate/result'));
    },
  },

  reducers: {
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
  },
};
