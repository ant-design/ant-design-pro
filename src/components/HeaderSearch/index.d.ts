import * as React from 'react';
export interface IHeaderSearchProps {
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

export default class HeaderSearch extends React.Component<IHeaderSearchProps, any> {}
