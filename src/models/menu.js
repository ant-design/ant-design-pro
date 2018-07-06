import { queryCurrent } from '../services/menu';
import { getFlatMenuData, getRouterData } from '../common/router';
import { getMenuData } from '../common/menu';


export default {
  namespace: 'menu',

  state: {
    currentMenu: [],
    routerData: [],
    routerConfig: {},
  },

  effects: {
    *fetchCurrent(_, { call, put, select }) {
      const routerConfig = yield select(state => state.menu.routerConfig);
      const response = yield call(queryCurrent);
      const currentMenu = getMenuData(response);
      const flatMenuData = getFlatMenuData(currentMenu);
      const routerData = getRouterData(routerConfig, flatMenuData);
      yield put({
        type: 'saveCurrentMenu',
        payload: currentMenu,
      });
      yield put({
        type: 'saveRouterData',
        payload: routerData,
      });
    },
  },

  reducers: {
    saveCurrentMenu(state, action) {
      return {
        ...state,
        currentMenu: action.payload,
      };
    },
    saveRouterData(state, {payload}) {
      return {
        ...state,
        routerData: payload,
      };
    },
    saveRouterConfig(state, {payload}) {
      return {
        ...state,
        routerConfig: payload,
      };
    },
  },
}
