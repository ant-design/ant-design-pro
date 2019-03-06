import { SkeletonProps } from 'antd/es/skeleton';
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
  name?: string;
  showClear?: boolean;
  showViewMore?: boolean;
  style?: React.CSSProperties;
  title?: string;
}

export default class NoticeIconTab extends React.Component<INoticeIconTabProps, any> {}
