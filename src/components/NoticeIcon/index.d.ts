import * as React from 'react';
import NoticeIconTab, { INoticeIconData } from './NoticeIconTab';

export interface INoticeIconProps {
  count?: number;
  className?: string;
  loading?: boolean;
  onClear?: (tableTile: string) => void;
  onItemClick?: (item: INoticeIconData, tabProps: INoticeIconProps) => void;
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
  style?: React.CSSProperties;
  onPopupVisibleChange?: (visible: boolean) => void;
  popupVisible?: boolean;
  locale?: { emptyText: string; clear: string };
}

export default class NoticeIcon extends React.Component<INoticeIconProps, any> {
  public static Tab: typeof NoticeIconTab;
}
