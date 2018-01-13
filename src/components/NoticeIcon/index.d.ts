import * as React from 'react';
export interface NoticeIconData {
  avatar?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  datetime?: React.ReactNode;
  extra?: React.ReactNode;
  style?: React.CSSProperties;
}

export interface NoticeIconProps {
  count?: number;
  className?: string;
  loading?: boolean;
  onClear?: (tableTile: string) => void;
  onItemClick?: (item: NoticeIconData, tabProps: NoticeIconProps) => void;
  onTabChange?: (tableTile: string) => void;
  popupAlign?: {
    points?: [string, string];
    offset?: [number, number];
    targetOffset?: [number, number];
    overflow?: any;
    useCssRight?: boolean;
    useCssBottom?: boolean;
    useCssTransform?: boolean;
  };
  onPopupVisibleChange?: (visible: boolean) => void;
  popupVisible?: boolean;
  locale?: { emptyText: string; clear: string };
}

export interface NoticeIconTabProps {
  list?: Array<NoticeIconData>;
  title?: string;
  emptyText?: React.ReactNode;
  emptyImage?: string;
}

export class NoticeIconTab extends React.Component<NoticeIconTabProps, any> {}

export default class NoticeIcon extends React.Component<NoticeIconProps, any> {
  static Tab: typeof NoticeIconTab;
}
