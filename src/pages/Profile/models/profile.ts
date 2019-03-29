import { queryBasicProfile, queryAdvancedProfile } from '@/services/api';
import { Effect } from '@/models/connect';
import { Reducer } from 'redux';
import { AdvancedOperation } from '../AdvancedProfile';
import { Application, BasicGoodsItem, BasicProgressItem, UserInfo } from '../BasicProfile';

export interface ProfileModelState {
  basicGoods: BasicGoodsItem[];
  advancedOperation1: AdvancedOperation[];
  advancedOperation2: AdvancedOperation[];
  advancedOperation3: AdvancedOperation[];
  basicProgress: BasicProgressItem[];
  userInfo: Partial<UserInfo>;
  application: Partial<Application>;
}

export interface ProfileModel {
  namespace: 'profile';
  state: ProfileModelState;
  effects: {
    fetchBasic: Effect;
    fetchAdvanced: Effect;
  };
  reducers: {
    show: Reducer<any>;
  };
}

const ProfileModel: ProfileModel = {
  namespace: 'profile',

  state: {
    basicGoods: [],
    advancedOperation1: [],
    advancedOperation2: [],
    advancedOperation3: [],
    basicProgress: [],
    userInfo: {},
    application: {},
  },

  effects: {
    *fetchBasic({ payload }, { call, put }) {
      const response = yield call(queryBasicProfile, payload);
      yield put({
        type: 'show',
        payload: response,
      });
    },
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

export default ProfileModel;
