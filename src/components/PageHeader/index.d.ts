import React from 'react';
import { Location } from 'history';

export interface PageHeaderProps {
  title?: React.ReactNode | string | number;
  logo?: React.ReactNode | string;
  action?: React.ReactNode | string;
  content?: React.ReactNode;
  extraContent?: React.ReactNode;
  routes?: any[];
  params?: any;
  breadcrumbList?: Array<{ title: string | number; href?: string }>;
  tabList?: Array<{ key: string; tab: React.ReactNode }>;
  tabActiveKey?: string;
  tabDefaultActiveKey?: string;
  onTabChange?: (key: string) => void;
  tabBarExtraContent?: React.ReactNode;
  linkElement?: React.ReactNode | string;
  style?: React.CSSProperties;
  home?: React.ReactNode;
  wide?: boolean;
  hiddenBreadcrumb?: boolean;
  className?: string;
  loading?: boolean;
  breadcrumbSeparator?: React.ReactNode;
  location?: Location;
  itemRender: (menuItem: any) => React.ReactNode;
  breadcrumbNameMap?: any;
}

export default class PageHeader extends React.Component<PageHeaderProps, any> {}
