import { query as queryUsers, queryCurrent, queryMenus } from '../services/user';
import {getMenuData} from "../common/menu";

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    menuData: [],
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
    *fetchMenus(_, { call, put }) {
      const response = yield call(queryMenus);
      const menus = getMenuData(response)
      yield put({
        type: 'saveMenus',
        payload: menus,
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
        currentUser: action.payload,
      };
    },
    saveMenus(state, action) {
      return {
        ...state,
        menuData: action.payload,
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
