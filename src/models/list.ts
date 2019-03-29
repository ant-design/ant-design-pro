import { addFakeList, queryFakeList, removeFakeList, updateFakeList } from '@/services/api';
import { Effect } from 'dva';
import { Reducer } from 'redux';

export interface MockListItem {
  id: string;
  owner: string;
  title: string;
  avatar: string;
  cover: string;
  status: string;
  percent: number;
  logo: string;
  href: string;
  updatedAt: Date;
  createdAt: Date;
  subDescription: string;
  description: string;
  activeUser: number | string;
  newUser: number | string;
  star: number | string;
  like: number | string;
  message: number | string;
  content: string;
  members: {
    avatar: string;
    name: string;
    id: string;
  }[];
}

export interface ListModelState {
  list: MockListItem[];
}

export interface ListModel {
  namespace: 'list';
  state: ListModelState;
  effects: {
    fetch: Effect;
    appendFetch: Effect;
    submit: Effect;
  };
  reducers: {
    queryList: Reducer<any>;
    appendList: Reducer<any>;
  };
}

const ListModel: ListModel = {
  namespace: 'list',

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
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *submit({ payload }, { call, put }) {
      let callback: (params: any) => Promise<any>;
      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
      } else {
        callback = addFakeList;
      }
      const response = yield call(callback, payload); // post
      yield put({
        type: 'queryList',
        payload: response,
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
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
  },
};

export default ListModel;
