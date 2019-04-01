import { query as queryUsers, queryCurrent } from '@/services/user';
import { LabeledValue } from 'antd/es/select';
import { Effect } from '@/models/connect';
import { Reducer } from 'redux';

export interface CurrentUser {
  address?: string;
  avatar?: string;
  country?: string;
  email?: string;
  geographic?: { province: LabeledValue; city: LabeledValue };
  group?: string;
  notifyCount: number;
  name?: string;
  phone?: string;
  signature?: string;
  tags?: LabeledValue[];
  title?: string;
  unreadCount?: number;
  userid?: string;
}

export interface UserModelState {
  list: {
    key: string;
    name: string;
    age: number;
    address: string;
  }[];
  currentUser: CurrentUser;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    save: Reducer<UserModelState>;
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;
