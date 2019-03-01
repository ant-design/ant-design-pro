import { queryActivities } from '@/services/api';
import { Effect } from 'dva';
import { Reducer } from 'redux';

export interface IActivitiesState {
  list: any[];
}

export interface IActivitiesModel {
  namespace: 'activities';
  state: IActivitiesState;
  effects: {
    fetchList: Effect;
  };
  reducers: {
    saveList: Reducer<any>;
  };
}

export default {
  namespace: 'activities',

  state: {
    list: [],
  },

  effects: {
    *fetchList(_, { call, put }) {
      const response = yield call(queryActivities);
      yield put({
        type: 'saveList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    saveList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
