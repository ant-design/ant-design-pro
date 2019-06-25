import {message} from 'antd';
import {getAdapterList} from '../services/sysDataService';
import {detail} from '../services/uniCompService';
import constants from '@/utils/constUtil';

const { STATUS } = constants;
export default {
  namespace: 'adapterModel',

  state: {
    adapterList: [],
    adapter:{},
  },

  effects: {
    * getAdapterList({payload ,callback}, {call, put}) {
      console.log("---",getAdapterList)
      const response = yield call(getAdapterList,payload);
      if (callback) {
        const data = response && response.data ? response.data : [];
        const adapterList = data.filter(item => item.status === STATUS.A);
        callback(adapterList);
      }
      ;
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *detail({ payload, callback }, { call }) {
      // console.log('sysdata detail request in Model:', payload);
      const response = yield call(detail, payload);
      // console.log('sysdata detail response in Model:', response,(!response||response.code!=="200"));
      if(!response||response.code!=="200"){
        response.data={};
        const errorMsg=response.msg&&response.msg!==""?response.msg:`Sorry, the server is reporting an error,code=${response.code}`;
        message.error(errorMsg);
      }
      if (callback) callback(response.data);
    },
  },
  reducers: {
    save(state, action) {
      const data = action.payload ? action.payload.data : [];
      const adapterList = data.filter(item => item.status === STATUS.A);
      // adapterList.unshift({"adapterId": null, "adapterName": "All"});
      return {
        ...state,
        adapterList,
      };
    },
  },
};
