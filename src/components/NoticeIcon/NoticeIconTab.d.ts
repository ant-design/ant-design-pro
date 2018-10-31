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
  list?: INoticeIconData[];
  title?: string;
  name?: string;
  emptyText?: React.ReactNode;
  emptyImage?: string;
  style?: React.CSSProperties;
  showClear?: boolean;
}

export default class NoticeIconTab extends React.Component<INoticeIconTabProps, any> {}
