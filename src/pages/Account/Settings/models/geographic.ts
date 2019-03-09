import { queryCity, queryProvince } from '@/services/geographic';
import { Effect, Subscription } from 'dva';
import { Reducer } from 'redux';

export interface IGeographicModelState {
  province: any[];
  city: any[];
  isLoading: boolean;
}

export interface IGeographicModel {
  namespace: 'geographic';
  state: IGeographicModelState;
  effects: {
    fetchProvince: Effect;
    fetchCity: Effect;
  };
  reducers: {
    setProvince: Reducer<any>;
    setCity: Reducer<any>;
    changeLoading: Reducer<any>;
  };
}

const GeographicModel: IGeographicModel = {
  namespace: 'geographic',

  state: {
    province: [],
    city: [],
    isLoading: false,
  },

  effects: {
    *fetchProvince(_, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryProvince);
      yield put({
        type: 'setProvince',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *fetchCity({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryCity, payload);
      yield put({
        type: 'setCity',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
  },

  reducers: {
    setProvince(state, action) {
      return {
        ...state,
        province: action.payload,
      };
    },
    setCity(state, action) {
      return {
        ...state,
        city: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
  },
};

export default GeographicModel;
