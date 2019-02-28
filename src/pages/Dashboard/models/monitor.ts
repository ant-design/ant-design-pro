import { queryTags } from '@/services/api';
import { Effect } from 'dva';
import { Reducer } from 'redux';

export interface IMonitorState {
  tags: any[];
}

export interface IMonitorModel {
  namespace: 'monitor';
  state: IMonitorState;
  effects: {
    fetchTags: Effect;
  };
  reducers: {
    saveTags: Reducer<any>;
  };
}

export default {
  namespace: 'monitor',

  state: {
    tags: [],
  },

  effects: {
    *fetchTags(_, { call, put }) {
      const response = yield call(queryTags);
      yield put({
        type: 'saveTags',
        payload: response.list,
      });
    },
  },

  reducers: {
    saveTags(state, action) {
      return {
        ...state,
        tags: action.payload,
      };
    },
  },
};
