import { queryTags } from '@/services/api';
import { Effect } from '@/models/connect';
import { Reducer } from 'redux';

export interface MonitorModelState {
  tags: any[];
}

export interface MonitorModel {
  namespace: 'monitor';
  state: MonitorModelState;
  effects: {
    fetchTags: Effect;
  };
  reducers: {
    saveTags: Reducer<any>;
  };
}

const MonitorModel: MonitorModel = {
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

export default MonitorModel;
