import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import { formatMessage } from 'umi-plugin-react/locale';
import Authorized from '@/utils/Authorized';
import { menu } from '../defaultSettings';
import {list} from "../services/uniCompService";
import { getPrivileges,setPrivileges,setFormatPrivileges } from '@/utils/authority';
import constants from '@/utils/constUtil';

const {PREFIX_PATH} = constants;

const { check } = Authorized;

// Conversion router to menu.
function formatter(data, parentAuthority, parentName) {
  if (!data) {
    return undefined;
  }
  return data
    .map(item => {
      if (!item.name || !item.path) {
        return null;
      }

      let locale = 'menu';
      if (parentName && parentName !== '/') {
        locale = `${parentName}.${item.name}`;
      } else {
        locale = `menu.${item.name}`;
      }
      // if enableMenuLocale use item.name,
      // close menu international
      const name = menu.disableLocal
        ? item.name
        : formatMessage({ id: locale, defaultMessage: item.name });
      const result = {
        ...item,
        name,
        locale,
        authority: item.authority || parentAuthority,
      };
      if (item.routes) {
        const children = formatter(item.routes, item.authority, locale);
        // Reduce memory usage
        result.children = children;
      }
      delete result.routes;
      return result;
    })
    .filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

/**
 * get SubMenu or Item
 */
const getSubMenu = item => {
  // doc: add hideChildrenInMenu
  if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
    return {
      ...item,
      children: filterMenuData(item.children), // eslint-disable-line
    };
  }
  return item;
};

/**
 * filter menuData
 */
const filterMenuData = menuData => {
  if (!menuData) {
    return [];
  }
  return menuData
    .filter(item => item.name && !item.hideInMenu)
    .map(item => check(item.authority, getSubMenu(item)))
    .filter(item => item);
};
/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
const getBreadcrumbNameMap = menuData => {
  if (!menuData) {
    return {};
  }
  const routerMap = {};

  const flattenMenuData = data => {
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

export default {
  namespace: 'menu',

  state: {
    menuData: [],
    routerData: [],
    breadcrumbNameMap: {},
  },

  effects: {
    *getMenuData({ payload }, { call,put }) {
      const { routes,authority, path } = payload;
      let routesFromServer=[];
      // ------ start ---
      if(PREFIX_PATH!==""){
        const {flatToMenuTree } = payload;
        const params = {
          tableName:'sys_privilege',
          data:{
            info:{
              pageNo: 1,
              pageSize: 999,
            }
          }
        };

        const response = yield call(list, params);
        console.log('======response in menu.js:', response);
        if(flatToMenuTree){
          console.log('======has flatToMenuTree function:');
          flatToMenuTree(response.data.records,routes,0);
          setPrivileges(response.data.records);
          setFormatPrivileges(getPrivileges());
        }
        console.log('======routes in menu.js:', routes);
      }
      else{
        routesFromServer=routes;
      }
      // ------ end ---
      const originalMenuData = memoizeOneFormatter(routesFromServer, authority, path);
      const menuData = filterMenuData(originalMenuData);
      const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(originalMenuData);
      console.log("authority:",authority);
      console.log("originalMenuData:",originalMenuData);
      console.log("menuData:",menuData);
      console.log("breadcrumbNameMap:",breadcrumbNameMap);
      yield put({
        type: 'save',
        payload: { menuData, breadcrumbNameMap, routerData: routesFromServer },
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
