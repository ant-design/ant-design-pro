import city from '@/utils/geographic/city.json';
import province from '@/utils/geographic/province.json';

export default {
  namespace: 'geographic',

  state: {
    province: [],
    city: [],
    isLoading: false,
  },

  effects: {
    *fetchProvince(_, { put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = province;// yield call(queryProvince);
      yield put({
        type: 'setProvince',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    // *fetchCity({ payload }, { call, put }) {
    *fetchCity({ payload }, {  put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = city[payload];// yield call(queryCity, payload);
      console.log(payload,response);
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
