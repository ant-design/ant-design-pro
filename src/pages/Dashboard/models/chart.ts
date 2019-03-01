import { fakeChartData } from '@/services/api';
import { Effect } from 'dva';
import { Reducer } from 'redux';

export interface IChartModelState {
  visitData: any[];
  visitData2: any[];
  salesData: any[];
  searchData: any[];
  offlineData: any[];
  offlineChartData: any[];
  salesTypeData: any[];
  salesTypeDataOnline: any[];
  salesTypeDataOffline: any[];
  radarData: any[];
  loading: boolean;
}

export interface IChartModel {
  namespace: 'chart';
  state: IChartModelState;
  effects: {
    fetch: Effect;
    fetchSalesData: Effect;
  };
  reducers: {
    save: Reducer<any>;
    clear: Reducer<any>;
  };
}

const ChartModel: IChartModel = {
  namespace: 'chart',

  state: {
    visitData: [],
    visitData2: [],
    salesData: [],
    searchData: [],
    offlineData: [],
    offlineChartData: [],
    salesTypeData: [],
    salesTypeDataOnline: [],
    salesTypeDataOffline: [],
    radarData: [],
    loading: false,
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchSalesData(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
        visitData: [],
        visitData2: [],
        salesData: [],
        searchData: [],
        offlineData: [],
        offlineChartData: [],
        salesTypeData: [],
        salesTypeDataOnline: [],
        salesTypeDataOffline: [],
        radarData: [],
      };
    },
  },
};

export default ChartModel;
