import { MenuDataItem } from '@ant-design/pro-layout';
import Authorized from '@/utils/Authorized';
import { Effect } from 'dva';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import { Reducer } from 'redux';
import { formatMessage } from 'umi-plugin-react/locale';
import { IRoute } from 'umi-types';
import defaultSettings from '../../config/defaultSettings';

// Conversion router to menu.
function formatter(
  data: MenuDataItem[],
  parentAuthority?: string[] | string,
  parentName?: string,
): MenuDataItem[] {
  return data
    .filter(item => item.name && item.path)
    .map(item => {
      const locale = `${parentName || 'menu'}.${item.name!}`;
      // if enableMenuLocale use item.name,
      // close menu international
      const name = defaultSettings.menu.disableLocal
        ? item.name!
        : formatMessage({ id: locale, defaultMessage: item.name! });
      const result: MenuDataItem = {
        ...item,
        name,
        locale,
        routes: void 0,
        authority: item.authority || parentAuthority,
      };
      if (item.routes) {
        const children = formatter(item.routes, item.authority, locale);
        // Reduce memory usage
        result.children = children;
      }
      return result;
    });
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

/**
 * get SubMenu or Item
 */
const getSubMenu: (item: MenuDataItem) => MenuDataItem = item => {
  if (
    Array.isArray(item.children) &&
    !item.hideChildrenInMenu &&
    item.children.some(child => (child.name ? true : false))
  ) {
    const children = filterMenuData(item.children);
    if (children.length) return { ...item, children };
  }
  return { ...item, children: void 0 };
};

/**
 * filter menuData
 */
const filterMenuData = (menuData: MenuDataItem[] = []): MenuDataItem[] => {
  return menuData
    .filter(item => item.name && !item.hideInMenu)
    .map(item => Authorized.check<any, any>(item.authority!, getSubMenu(item), null))
    .filter(item => item);
};

/**
 * 获取面包屑映射
 * @param MenuDataItem[] menuData 菜单配置
 */
const getBreadcrumbNameMap = (menuData: MenuDataItem[]) => {
  const routerMap: { [key: string]: MenuDataItem } = {};
  const flattenMenuData: (data: MenuDataItem[]) => void = data => {
    data.forEach(menuItem => {
      if (menuItem.children) {
        flattenMenuData(menuItem.children);
      }
      // Reduce memory usage
      routerMap[menuItem.path] = menuItem;
    });
  };
  flattenMenuData(menuData);
  return routerMap;
};

const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);

export interface MenuModelState {
  menuData: MenuDataItem[];
  routerData: IRoute[];
  breadcrumbNameMap: object;
}

export interface MenuModelType {
  namespace: 'menu';
  state: MenuModelState;
  effects: {
    getMenuData: Effect;
  };
  reducers: {
    save: Reducer<MenuModelState>;
  };
}

const MenuModel: MenuModelType = {
  namespace: 'menu',

  state: {
    menuData: [],
    routerData: [],
    breadcrumbNameMap: {},
  },

  effects: {
    *getMenuData({ payload }, { put }) {
      const { routes, authority } = payload;
      const originalMenuData = memoizeOneFormatter(routes, authority);
      const menuData = filterMenuData(originalMenuData);
      const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(originalMenuData);
      yield put({
        type: 'save',
        payload: { menuData, breadcrumbNameMap, routerData: routes },
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default MenuModel;
