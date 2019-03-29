import { fakeChartData } from '@/services/api';
import { Effect } from '@/models/connect';
import { Reducer } from 'redux';

export interface ChartModelState {
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

export interface ChartModel {
  namespace: 'chart';
  state: ChartModelState;
  effects: {
    fetch: Effect;
    fetchSalesData: Effect;
  };
  reducers: {
    save: Reducer<ChartModelState>;
    clear: Reducer<ChartModelState>;
  };
}

const ChartModel: ChartModel = {
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
        loading: false,
      };
    },
  },
};

export default ChartModel;
