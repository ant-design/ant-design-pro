import { queryCurrent, query as queryUsers } from '@/services/user';
import { ImmerReducer } from './connect.d';
import { Effect } from 'dva';

export interface CurrentUser {
  avatar?: string;
  name?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  unreadCount?: number;
  notifyCount?: number;
}

export interface UserModelState {
  currentUser?: CurrentUser;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: ImmerReducer<UserModelState>;
    changeNotifyCount: ImmerReducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
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
    saveCurrentUser(state, action) {
      state!.currentUser = action.payload || {};
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      state.currentUser!.notifyCount = action.payload.totalCount;
      state.currentUser!.unreadCount = action.payload.unreadCount;
    },
  },
};

export default UserModel;
