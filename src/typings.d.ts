declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'rc-animate';
declare module 'omit.js';
declare module 'react-copy-to-clipboard';
declare module 'react-fittext';
declare module '@antv/data-set';
declare module 'nzh/cn';
declare var APP_TYPE: string;
declare module 'memoize-one' {
  function memoizeOne<T extends (...args: any[]) => any>(
    resultFn: T,
    isEqual?: (a: any, b: any, index: number) => boolean,
  ): T;
  export default memoizeOne;
}

declare module 'ant-design-pro' {
  import { Component } from 'react';
  export interface NoticeIconTabProps<T extends NoticeIconData = NoticeIconData> {
    className?: string;
    count?: number;
    emptyText?: React.ReactNode;
    emptyImage?: string;
    list?: T[];
    showClear?: boolean;
    showViewMore?: boolean;
    style?: React.CSSProperties;
    title?: string;
  }

  export type NoticeIconTabComponent<T extends NoticeIconData = NoticeIconData> = React.FC<
    NoticeIconTabProps<T>
  >;

  export interface NoticeIconData {
    avatar?: string | React.ReactNode;
    clickClose?: boolean;
    description?: React.ReactNode;
    datetime?: React.ReactNode;
    extra?: React.ReactNode;
    key?: string | number;
    read?: boolean;
    style?: React.CSSProperties;
    title?: React.ReactNode;
    [key: string]: any;
  }

  export interface NoticeIconProps<T extends NoticeIconData = NoticeIconData> {
    count?: number;
    bell?: React.ReactNode;
    className?: string;
    loading?: boolean;
    onClear?: (tabTitle?: string) => void;
    onItemClick?: (item: T, tabProps: NoticeIconProps<T>) => void;
    onViewMore?: (tabProps: NoticeIconProps<T>, e: React.MouseEvent) => void;
    onTabChange?: (tabTile?: string) => void;
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

  export default class NoticeIcon<T extends NoticeIconData = NoticeIconData> extends Component<
    NoticeIconProps<T>
  > {
    static Tab: NoticeIconTabComponent;
  }
}
