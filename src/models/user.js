import { query as queryUsers, queryCurrent } from '../services/user';
import Authorized from '../utils/AuthorizedManger';
import userManger from '../utils/userManger';

export default {
  namespace: 'user',

  state: {
    list: [],
    loading: true,
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
      // trigger loading page render
      yield put({
        type: 'changeLoaing',
        payload: true,
      });
      const userName = userManger.getUserName();
      // username is not empty
      if (userName) {
        const response = yield call(queryCurrent, userName);
        yield put({
          type: 'saveCurrentUser',
          payload: response,
        });
      } else {
        // username is empty, go to login
        yield put({
          type: 'login/logout',
        });
      }
      yield put({
        type: 'changeLoaing',
        payload: false,
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
      Authorized.setAuthorized(action.payload.role);
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    changeLoaing(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
