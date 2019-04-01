import { routerRedux } from 'dva/router';
import { saveApi,apiInfo } from '@/services/apiGatewayService';

import { message } from 'antd';

export default {
  namespace: 'apiCreateModel',

  state: {
    apiService: {
      apiServiceBackends:[{},],
    },
  },

  effects: {
    *apiInfo({ payload,callback }, { call, put }) {
      console.log(payload);
      const response = yield call(apiInfo, payload);
      console.log(response);
      yield put({
        type: 'initData',
        payload: response,
      });
      if (callback) callback(response);
    },
    *submitStepForm({ payload }, { call, put }) {
      const response = yield call(saveApi, payload);
      console.log("response:",response);
      if(payload.option===1) {
        yield put({
          type: 'saveStepFormData3',
          action:{payload,
          response,},
        });
      }
      if (response.code==="200"){
        if(payload.option===1) {
          yield put(routerRedux.push('/apiGateway/apiCreate/result'));
        }
        else{
          yield put({
            type: 'updateData',
            payload:response,
          });
          const msg=response.msg||"success。"
          message.success(msg);
        }
      }
      else{
        const msg=response.msg||"服务器内部错误。"
        message.error(msg);
      }
    },
  },

  reducers: {
    saveStepFormData(state, { payload }) {
      const apiService={...state.apiService, ...payload,};
      return {
        ...state,
        apiService,
      };
    },
    updateData(state, { payload }) {
      console.log("updateData:",payload);
      const apiService={...state.apiService, ...payload.data,};
      return {
        ...state,
        apiService,
      };
    },
    saveStepFormData3(state, { action }) {
      console.log("action:",action);
      const apiService=action.response&&action.response.code==="200"?{...state.apiService, ...action.response.data,}:{...state.apiService, ...action.payload.data.info.apiService,};
      return {
        ...state,
        apiService,
      };
    },
    initDataForAdd(){
      // 创建的时候初始化数据
      const apiService= {
        name: '语音识别',
          serviceType:'1',
          groupId: 2,
          requestUrl: '/rest/voice',
          // createUser:'Alex',
          protocol: 'HTTP',
          reqMethod: '2',
          apiServiceBackends:[{
          serviceType:'1',
          // url: 'http://aliyun.com',
          // protocol: 'HTTP',
          socketTimeout: 20000,
          connectTimeout: 30000,
          // backendType:'endpoint',
          serviceSeq:1,
          backendType:'endpoint',
        },
        ],
      };
      return {
        apiService,
      };
    },
    initData(state, { payload }) {
      const apiService = {...payload.data};
      return {
        ...state,
        apiService,
      };
    },
  },
};
