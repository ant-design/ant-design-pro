import type { Effect, Reducer } from 'umi';

import type { CardListItemDataType } from './data.d';
import { queryFakeList } from './service';

export type StateType = {
  list: CardListItemDataType[];
};

export type ModelType = {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
  };
};

const Model: ModelType = {
  namespace: 'listAndcardList',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};

export default Model;
