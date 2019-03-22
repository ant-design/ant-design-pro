import IconFont from '@/components/IconFont';
import { isUrl } from '@/utils/utils';
import { Icon, Menu } from 'antd';
import classNames from 'classnames';
import * as H from 'history';
import React, { Component } from 'react';
import Link from 'umi/link';
import { urlToList } from '../_utils/pathTools';
import styles from './index.less';
import { getMenuMatches } from './SiderMenuUtils';

const { SubMenu } = Menu;

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'icon-geren' #For Iconfont ,
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
const getIcon = icon => {
  if (typeof icon === 'string') {
    if (isUrl(icon)) {
      return <Icon component={() => <img src={icon} alt="icon" className={styles.icon} />} />;
    }
    if (icon.startsWith('icon-')) {
      return <IconFont type={icon} />;
    }
    return <Icon type={icon} />;
  }
  return icon;
};

export declare type CollapseType = 'clickTrigger' | 'responsive';
export declare type SiderTheme = 'light' | 'dark';
export declare type MenuMode =
  | 'vertical'
  | 'vertical-left'
  | 'vertical-right'
  | 'horizontal'
  | 'inline';

interface BaseMenuProps {
  flatMenuKeys?: any[];
  location?: H.Location;
  onCollapse?: (collapsed: boolean, type?: CollapseType) => void;
  isMobile?: boolean;
  openKeys?: any;
  theme?: SiderTheme;
  mode?: MenuMode;
  className?: string;
  collapsed?: boolean;
  handleOpenChange?: (openKeys: any[]) => void;
  menuData?: any[];
  style?: React.CSSProperties;
  onOpenChange?: (openKeys: string[]) => void;
}

interface BaseMenuState {}

export default class BaseMenu extends Component<BaseMenuProps, BaseMenuState> {
  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  getNavMenuItems: (menusData: any[]) => any[] = menusData => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => this.getSubMenuOrItem(item))
      .filter(item => item);
  };

  // Get the currently selected menu
  getSelectedMenuKeys = pathname => {
    const { flatMenuKeys } = this.props;
    return urlToList(pathname).map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop());
  };

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = item => {
    // doc: add hideChildrenInMenu
    if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
      const { name } = item;
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{name}</span>
              </span>
            ) : (
              name
            )
          }
          key={item.path}
        >
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      );
    }
    return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
  };

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = item => {
    const { name } = item;
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    const { location, isMobile, onCollapse } = this.props;
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === location.pathname}
        onClick={
          isMobile
            ? () => {
                onCollapse(true);
              }
            : undefined
        }
      >
        {icon}
        <span>{name}</span>
      </Link>
    );
  };

  conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };

  render() {
    const {
      openKeys,
      theme,
      mode,
      location: { pathname },
      className,
      collapsed,
      handleOpenChange,
      style,
      menuData,
    } = this.props;
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys(pathname);
    if (!selectedKeys.length && openKeys) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    let props = {};
    if (openKeys && !collapsed) {
      props = {
        openKeys: openKeys.length === 0 ? [...selectedKeys] : openKeys,
      };
    }
    const cls = classNames(className, {
      'top-nav-menu': mode === 'horizontal',
    });

    return (
      <Menu
        key="Menu"
        mode={mode}
        theme={theme}
        onOpenChange={handleOpenChange}
        selectedKeys={selectedKeys}
        style={style}
        className={cls}
        {...props}
      >
        {this.getNavMenuItems(menuData)}
      </Menu>
    );
  }
}
