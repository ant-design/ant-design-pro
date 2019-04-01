import { RadarDataItem } from '@/components/Charts/Radar';
import { Effect } from '@/models/connect';
import { fakeChartData } from '@/services/api';
import { Reducer } from 'redux';
import { VisitDataItem } from '../IntroduceRow';
import { OfflineChartDataItem, OfflineDataItem } from '../OfflineData';
import { SalesPieDataItem } from '../ProportionSales';
import { SalesDataItem } from '../SalesCard';
import { SearchDataItem } from '../TopSearch';

export interface ChartModelState {
  visitData: VisitDataItem[];
  visitData2: VisitDataItem[];
  salesData: SalesDataItem[];
  searchData: SearchDataItem[];
  offlineData: OfflineDataItem[];
  offlineChartData: OfflineChartDataItem[];
  salesTypeData: SalesPieDataItem[];
  salesTypeDataOnline: SalesPieDataItem[];
  salesTypeDataOffline: SalesPieDataItem[];
  radarData: RadarDataItem[];
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
