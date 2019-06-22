import {getAdapterList} from '../services/sysDataService';
import constants from '@/utils/constUtil';

const { STATUS } = constants;
export default {
  namespace: 'adapterModel',

  state: {
    adapterList: [],
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
