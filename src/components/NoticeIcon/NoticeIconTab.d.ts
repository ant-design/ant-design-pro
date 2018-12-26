import * as React from 'react';
import { SkeletonProps } from 'antd/lib/skeleton';
import { INoticeIconProps } from './index';

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
  loading?: boolean;
  loadMoreCount?: number;
  name?: string;
  onLoadMore?: (tabProps: INoticeIconProps) => void;
  skeletonProps: SkeletonProps;
  style?: React.CSSProperties;
  showClear?: boolean;
  title?: string;
}

export default class NoticeIconTab extends React.Component<INoticeIconTabProps, any> {}
