import { queryNotices } from '../services/api';
import { getAuthMenus } from '../services/auth';
import * as menuConfig from '../common/menu';

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
    routerConfig: {},
    // 存储菜单数据(全局缓存)
    menuData: [],
    // 存储路由数据(全局缓存)
    routerData: [],
  },

  effects: {
    *fetchMenus(_, { call, put, select }) {
      const routerConfig = yield select(state => state.global.routerConfig);

      const remoteMenuData = yield call(getAuthMenus);
      const menuData = menuConfig.getMenuData(remoteMenuData);

      const flatMenuData = menuConfig.getFlatMenuData(menuData);
      const routerData = menuConfig.getRouterData(routerConfig, flatMenuData);

      yield put({
        type: 'saveMenus',
        payload: menuData,
      });

      yield put({
        type: 'saveRouterData',
        payload: routerData,
      });
    },

    *fetchNotices(_, { call, put }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: data.length,
      });
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      yield put({
        type: 'user/changeNotifyCount',
        payload: count,
      });
    },
  },

  reducers: {
    saveMenus(state, { payload }) {
      return {
        ...state,
        menuData: payload,
      };
    },
    saveRouterConfig(state, { payload }) {
      return {
        ...state,
        routerConfig: payload,
      };
    },
    saveRouterData(state, { payload }) {
      return {
        ...state,
        routerData: payload,
      };
    },
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
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
