import React from "react";
export interface PageHeaderProps {
  title?: React.ReactNode | string;
  logo?: React.ReactNode | string;
  action?: React.ReactNode | string;
  content?: React.ReactNode;
  extraContent?: React.ReactNode;
  routes?: Array<any>;
  params: any;
  breadcrumbList?: Array<{ title: React.ReactNode; href?: string }>;
  tabList?: Array<{ key: string; tab: React.ReactNode }>;
  onTabChange?: (key: string) => void;
  linkElement?: string | React.ReactNode;
}

export default class PageHeader extends React.Component<PageHeaderProps, any> {}
