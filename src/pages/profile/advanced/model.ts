import { Effect, Reducer } from 'umi';
import { AdvancedProfileData } from './data.d';
import { queryAdvancedProfile } from './service';

export interface ModelType {
  namespace: string;
  state: AdvancedProfileData;
  effects: {
    fetchAdvanced: Effect;
  };
  reducers: {
    show: Reducer<AdvancedProfileData>;
  };
}

const Model: ModelType = {
  namespace: 'profileAndadvanced',

  state: {
    advancedOperation1: [],
    advancedOperation2: [],
    advancedOperation3: [],
  },

  effects: {
    *fetchAdvanced(_, { call, put }) {
      const response = yield call(queryAdvancedProfile);
      yield put({
        type: 'show',
        payload: response,
      });
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Model;
