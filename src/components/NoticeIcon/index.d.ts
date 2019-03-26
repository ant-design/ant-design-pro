import React from 'react';
import NoticeIconTab, { NoticeIconData } from './NoticeIconTab';

export interface NoticeIconProps {
  count?: number;
  bell?: React.ReactNode;
  className?: string;
  loading?: boolean;
  onClear?: (tabName: string) => void;
  onItemClick?: (item: NoticeIconData, tabProps: NoticeIconProps) => void;
  onViewMore?: (tabProps: NoticeIconProps, e: MouseEvent) => void;
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

export default class NoticeIcon extends React.Component<NoticeIconProps, any> {
  public static Tab: typeof NoticeIconTab;
}
