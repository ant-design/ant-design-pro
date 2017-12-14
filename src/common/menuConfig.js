/* Menu 中心化配置文件，脚手架中的 menu 根据此文件 export 的数据生成
 * - 输出数据的格式
 *  [{
 *    name: 'dashborad',               // subMenu title
 *    icon: 'dashboard',               // subMenu icon
 *    key: 'dashboard',                // unique key
 *    children: [{
 *      name: '分析页',                 // menu item title
 *      path: '/dashboard/analysis',   // menu item link(and key)
 *    }, {
 *      name: '监控页',
 *      path: '/dashboard/monitor',
 *    }, {
 *      name: '工作台',
 *      path: '/dashboard/workplace',
 *    }]
 *  }]
 * - 因为 routerConfig 中已经包含了部分 menu 所需信息，为了避免重复维护，可以利用 util 函数结合
 *   subMenu 信息，来生成总的 menu 信息，一般情况下你只需要像下面这样给出 subMenu 信息即可
*/

import { getRouterData } from './routerConfig';
import { getMenuItem } from '../utils/utils';

const categoryMap = {
  dashboard: {
    name: 'dashboard',
    icon: 'dashboard',
    // childMap: {                      如果 dashboard 下还有子菜单，可以通过嵌套 childMap 实现
    //   [childKey]: {                  childMap 数据格式与父级相同
    //     name: [childName],
    //     icon: [childIcon],
    //   }
    // }
  },
  form: {
    name: '表单页',
    icon: 'form',
  },
  list: {
    name: '列表页',
    icon: 'table',
    childMap: {
      search: {
        name: '搜索列表',
        icon: 'search',
      }
    }
  },
  profile: {
    name: '详情页',
    icon: 'profile',
  },
  result: {
    name: '结果页',
    icon: 'check-circle-o',
  },
  exception: {
    name: '异常页',
    icon: 'warning',
  },
  user: {
    name: '账户',
    icon: 'user',
  },
};

export const getMenuData = () => {
  const menuData = Object.keys(categoryMap).map(category =>
    getMenuItem(category, categoryMap, getRouterData()));
  const extraData = [{
    name: '使用文档',
    icon: 'book',
    path: 'http://pro.ant.design/docs/getting-started',
    target: '_blank',
  }];
  return menuData.concat(extraData);
};
