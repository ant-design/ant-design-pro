import * as React from 'react';
export interface HeaderSearchProps {
  placeholder?: string;
  dataSource?: Array<string>;
  onSearch?: (value: string) => void;
  onChange?: (value: string) => void;
  onPressEnter?: (value: string) => void;
  style?: React.CSSProperties;
}

export default class HeaderSearch extends React.Component<
  HeaderSearchProps,
  any
> {}
