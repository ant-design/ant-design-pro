import { queryNotices } from '@/services/api';
import { Effect, Subscription } from 'dva';
import { Reducer } from 'redux';

export interface IGlobalModelState {
  collapsed: boolean;
  notices: any[];
  loadedAllNotices: boolean;
}

export interface IGlobalModel {
  namespace: 'global';
  state: IGlobalModelState;
  effects: {
    fetchNotices: Effect;
    fetchMoreNotices: Effect;
    clearNotices: Effect;
    changeNoticeReadState: Effect;
  };
  reducers: {
    changeLayoutCollapsed: Reducer<any>;
    saveNotices: Reducer<any>;
    saveClearedNotices: Reducer<any>;
    pushNotices: Reducer<any>;
    setLoadedStatus: Reducer<any>;
  };
  subscriptions: { setup: Subscription };
}

const GlobalModel: IGlobalModel = {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
    loadedAllNotices: false,
  },

  effects: {
    *fetchNotices(_, { call, put, select }) {
      const data = yield call(queryNotices);
      const loadedAllNotices = data && data.length && data[data.length - 1] === null;
      yield put({
        type: 'setLoadedStatus',
        payload: loadedAllNotices,
      });
      yield put({
        type: 'saveNotices',
        payload: data.filter(item => item),
      });
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: data.length,
          unreadCount,
        },
      });
    },
    *fetchMoreNotices({ payload }, { call, put, select }) {
      const data = yield call(queryNotices, payload);
      const loadedAllNotices = data && data.length && data[data.length - 1] === null;
      yield put({
        type: 'setLoadedStatus',
        payload: loadedAllNotices,
      });
      yield put({
        type: 'pushNotices',
        payload: data.filter(item => item),
      });
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: data.length,
          unreadCount,
        },
      });
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: count,
          unreadCount,
        },
      });
    },
    *changeNoticeReadState({ payload }, { put, select }) {
      const notices = yield select(state =>
        state.global.notices.map(item => {
          const notice = { ...item };
          if (notice.id === payload) {
            notice.read = true;
          }
          return notice;
        })
      );
      yield put({
        type: 'saveNotices',
        payload: notices,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: notices.length,
          unreadCount: notices.filter(item => !item.read).length,
        },
      });
    },
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload,
      };
    },
    saveClearedNotices(state, { payload }) {
      return {
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
    pushNotices(state, { payload }) {
      return {
        ...state,
        notices: [...state.notices, ...payload],
      };
    },
    setLoadedStatus(state, { payload }) {
      return {
        ...state,
        loadedAllNotices: payload,
      };
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof (window as any).ga !== 'undefined') {
          (window as any).ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};

export default GlobalModel;
