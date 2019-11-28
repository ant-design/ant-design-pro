import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { TagType } from './data.d';
import { queryTags } from './service';

export interface StateType {
  tags: TagType[];
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchTags: Effect;
  };
  reducers: {
    saveTags: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'dashboardAndmonitor',

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

export default Model;
