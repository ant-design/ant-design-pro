import { SkeletonProps } from 'antd/lib/skeleton';
import React from 'react';

export interface INoticeIconData {
  avatar?: string | React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  datetime?: React.ReactNode;
  extra?: React.ReactNode;
  style?: React.CSSProperties;
}

export interface INoticeIconTabProps {
  count?: number;
  emptyText?: React.ReactNode;
  emptyImage?: string;
  list?: INoticeIconData[];
  name?: string;
  showClear?: boolean;
  showViewMore?: boolean;
  style?: React.CSSProperties;
  title?: string;
  data?: any[];
  onClick: (item: any) => void;
  onClear: (item: any) => void;
  locale: any;
  onViewMore: (e: any) => void;
}

export default class NoticeIconTab extends React.Component<INoticeIconTabProps, any> {}
