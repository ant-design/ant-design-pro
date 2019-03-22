/// <reference types="history"  />
import * as React from 'react';
import { Location } from 'history';
export interface IPageHeaderProps {
  title?: React.ReactNode | string;
  logo?: React.ReactNode | string;
  action?: React.ReactNode | string;
  content?: React.ReactNode;
  extraContent?: React.ReactNode;
  routes?: any[];
  params?: any;
  breadcrumbList?: Array<{ title: React.ReactNode; href?: string }>;
  tabList?: Array<{ key: string; tab: React.ReactNode }>;
  tabActiveKey?: string;
  tabDefaultActiveKey?: string;
  onTabChange?: (key: string) => void;
  tabBarExtraContent?: React.ReactNode;
  linkElement?: React.ReactNode;
  style?: React.CSSProperties;
  home?: React.ReactNode;
  wide?: boolean;
  hiddenBreadcrumb?: boolean;
  location?: Location;
  itemRender: (menuItem: any) => React.ReactNode;
  breadcrumbNameMap?: any;
}

export default class PageHeader extends React.Component<IPageHeaderProps, any> {}
