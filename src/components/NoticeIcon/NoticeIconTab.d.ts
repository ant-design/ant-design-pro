import { SkeletonProps } from 'antd/lib/skeleton';
import * as React from 'react';

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
  loadedAll?: boolean;
  loading?: boolean;
  name?: string;
  showClear?: boolean;
  skeletonCount?: number;
  skeletonProps: SkeletonProps;
  style?: React.CSSProperties;
  title?: string;
}

export default class NoticeIconTab extends React.Component<INoticeIconTabProps, any> {}
