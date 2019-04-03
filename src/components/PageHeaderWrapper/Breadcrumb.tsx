import React from 'react';
import pathToRegexp from 'path-to-regexp';
import Link from 'umi/link';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { urlToList } from '../_utils/pathTools';
import { PageHeaderWrapperProps } from '.';
import { MenuDataItem } from '../SiderMenu';
import { BreadcrumbProps as AntdBreadcrumbProps } from 'antd/lib/breadcrumb';

type BreadcrumbProps = PageHeaderWrapperProps;

// 渲染Breadcrumb 子节点
// Render the Breadcrumb child node
const itemRender: AntdBreadcrumbProps['itemRender'] = (route, params, routes, paths) => {
  const last = routes.indexOf(route) === routes.length - 1;
  return last || !route.component ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
  );
};

const renderItemLocal = (item: MenuDataItem): React.ReactNode => {
  if (item.locale) {
    return <FormattedMessage id={item.locale} defaultMessage={item.name} />;
  }
  return item.name;
};

export const getBreadcrumb = (
  breadcrumbNameMap: PageHeaderWrapperProps['breadcrumbNameMap'],
  url: string,
): MenuDataItem => {
  if (!breadcrumbNameMap) {
    return {
      path: '',
    };
  }
  let breadcrumb = breadcrumbNameMap[url];
  if (!breadcrumb) {
    Object.keys(breadcrumbNameMap).forEach(item => {
      if (pathToRegexp(item).test(url)) {
        breadcrumb = breadcrumbNameMap[item];
      }
    });
  }
  return breadcrumb || { path: '' };
};

export const getBreadcrumbProps = (props: BreadcrumbProps): PageHeaderWrapperProps => {
  const { location, breadcrumbNameMap } = props;
  return {
    location,
    breadcrumbNameMap,
  };
};

// Generated according to props
const conversionFromProps = (props: BreadcrumbProps): AntdBreadcrumbProps['routes'] => {
  const { breadcrumbList = [] } = props;
  return breadcrumbList
    .map(item => {
      const { title, href } = item;
      return {
        path: href,
        breadcrumbName: title,
      };
    })
    .filter(item => item.path);
};

const conversionFromLocation = (
  routerLocation: PageHeaderWrapperProps['location'],
  breadcrumbNameMap: PageHeaderWrapperProps['breadcrumbNameMap'],
  props: BreadcrumbProps,
): AntdBreadcrumbProps['routes'] => {
  if (!routerLocation) {
    return [];
  }
  const { home } = props;
  // Convert the url to an array
  const pathSnippets = urlToList(routerLocation.pathname);
  // Loop data mosaic routing
  const extraBreadcrumbItems: AntdBreadcrumbProps['routes'] = pathSnippets
    .map(url => {
      const currentBreadcrumb = getBreadcrumb(breadcrumbNameMap, url);
      if (currentBreadcrumb.inherited) {
        return { path: '', breadcrumbName: '' };
      }
      const name = renderItemLocal(currentBreadcrumb);
      const { hideInBreadcrumb } = currentBreadcrumb;
      return name && !hideInBreadcrumb
        ? {
            path: url,
            breadcrumbName: name,
          }
        : { path: '', breadcrumbName: '' };
    })
    .filter(item => item && item.path);
  // Add home breadcrumbs to your head if defined
  if (home) {
    extraBreadcrumbItems.unshift({
      path: '/',
      breadcrumbName: home,
    });
  }
  return extraBreadcrumbItems;
};

/**
 * 将参数转化为面包屑
 * Convert parameters into breadcrumbs
 */
export const conversionBreadcrumbList = (props: BreadcrumbProps): AntdBreadcrumbProps => {
  const { breadcrumbList } = props;
  const { location, breadcrumbNameMap } = getBreadcrumbProps(props);
  if (breadcrumbList && breadcrumbList.length) {
    return {
      routes: conversionFromProps(props),
      itemRender,
    };
  }

  // 根据 location 生成 面包屑
  // Generate breadcrumbs based on location
  if (location && location.pathname) {
    return {
      routes: conversionFromLocation(location, breadcrumbNameMap, props),
      itemRender,
    };
  }
  return {
    routes: [],
  };
};
