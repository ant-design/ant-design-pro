import { queryCity, queryProvince } from '@/services/geographic';
import { Effect } from '@/models/connect';
import { Reducer } from 'redux';

export interface GeographicModelState {
  province: { name: string; id: string }[];
  city: { province: string; name: string; id: string }[];
  isLoading: boolean;
}

export interface GeographicModel {
  namespace: 'geographic';
  state: GeographicModelState;
  effects: {
    fetchProvince: Effect;
    fetchCity: Effect;
  };
  reducers: {
    setProvince: Reducer<GeographicModelState>;
    setCity: Reducer<GeographicModelState>;
    changeLoading: Reducer<GeographicModelState>;
  };
}

const GeographicModel: GeographicModel = {
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
