import * as React from 'react';
import NoticeIconTab, { INoticeIconData } from './NoticeIconTab';

export interface INoticeIconProps {
  count?: number;
  bell?: React.ReactNode;
  className?: string;
  loading?: boolean;
  onClear?: (tabName: string) => void;
  onItemClick?: (item: INoticeIconData, tabProps: INoticeIconProps) => void;
  onViewMore?: (tabProps: INoticeIconProps) => void;
  onTabChange?: (tabTile: string) => void;
  style?: React.CSSProperties;
  onPopupVisibleChange?: (visible: boolean) => void;
  popupVisible?: boolean;
  locale?: {
    emptyText: string;
    clear: string;
    viewMore: string;
    [key: string]: string;
  };
  clearClose?: boolean;
}

export default class NoticeIcon extends React.Component<INoticeIconProps, any> {
  public static Tab: typeof NoticeIconTab;
}
