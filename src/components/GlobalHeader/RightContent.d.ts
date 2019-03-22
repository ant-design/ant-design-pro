import * as React from 'react';
import { DropDownProps } from 'antd/lib/dropdown';
import { ClickParam } from 'antd/es/menu';

export declare type SiderTheme = 'light' | 'dark';

export interface GlobalHeaderRightProps {
  notices?: any[];
  dispatch?: (args: any) => void;
  // wait for https://github.com/umijs/umi/pull/2036
  currentUser?: {
    avatar?: string;
    name?: string;
    title?: string;
    group?: string;
    signature?: string;
    geographic?: any;
    tags?: any[];
    unreadCount: number;
  };
  fetchingNotices?: boolean;
  onNoticeVisibleChange?: (visible: boolean) => void;
  onMenuClick?: (param: ClickParam) => void;
  onNoticeClear?: (tabName: string) => void;
  theme?: SiderTheme;
}

export default class GlobalHeaderRight extends React.Component<GlobalHeaderRightProps, any> {}
