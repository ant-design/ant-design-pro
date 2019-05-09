import React from 'react';

export interface IGlobalHeaderProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  isMobile?: boolean;
  logo?: string;
  onNoticeClear?: (type: string) => void;
  onMenuClick?: ({ key: string }) => void;
  onNoticeVisibleChange?: (b: boolean) => void;
}

export default class GlobalHeader extends React.Component<IGlobalHeaderProps, any> {}
