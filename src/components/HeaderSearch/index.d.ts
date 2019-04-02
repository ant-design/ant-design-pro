import React from 'react';
export interface HeaderSearchProps {
  placeholder?: string;
  dataSource?: string[];
  defaultOpen?: boolean;
  open?: boolean;
  onSearch?: (value: string) => void;
  onChange?: (value: string) => void;
  onVisibleChange?: (visible: boolean) => void;
  onPressEnter?: (value: string) => void;
  style?: React.CSSProperties;
  className?: string;
}

export default class HeaderSearch extends React.Component<HeaderSearchProps, any> {}
