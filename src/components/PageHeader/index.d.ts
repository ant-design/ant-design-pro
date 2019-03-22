import * as React from 'react';
export interface PageHeaderProps {
  title?: string | number;
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
  itemRender?: (item: any) => string;
  className?: string;
  loading?: boolean;
  location?: Location;
  breadcrumbNameMap?: object;
  breadcrumbSeparator?: React.ReactNode;
}

export default class PageHeader extends React.Component<PageHeaderProps, any> {}
