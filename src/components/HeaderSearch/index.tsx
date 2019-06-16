import { AutoComplete, Icon, Input } from 'antd';
import React, { Component } from 'react';

import { DataSourceItemType, AutoCompleteProps } from 'antd/es/auto-complete';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import styles from './index.less';

export interface HeaderSearchProps {
  onPressEnter: (value: string) => void;
  onSearch: (value: string) => void;
  onChange: (value: string) => void;
  onVisibleChange: (b: boolean) => void;
  className: string;
  placeholder: string;
  defaultActiveFirstOption: boolean;
  dataSource: DataSourceItemType[];
  defaultOpen: boolean;
  open?: boolean;
}

interface HeaderSearchState {
  value: string;
  searchMode: boolean;
}

export default class HeaderSearch extends Component<HeaderSearchProps, HeaderSearchState> {
  static defaultProps = {
    defaultActiveFirstOption: false,
    onPressEnter: () => {},
    onSearch: () => {},
    onChange: () => {},
    className: '',
    placeholder: '',
    dataSource: [],
    defaultOpen: false,
    onVisibleChange: () => {},
  };

  static getDerivedStateFromProps(props: HeaderSearchProps) {
    if ('open' in props) {
      return {
        searchMode: props.open,
      };
    }
    return null;
  }

  private timeout: number | undefined = undefined;

  private inputRef: Input | null = null;

  constructor(props: HeaderSearchProps) {
    super(props);
    this.state = {
      searchMode: props.defaultOpen,
      value: '',
    };
    this.debouncePressEnter = debounce(this.debouncePressEnter, 500, {
      leading: true,
      trailing: false,
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const { onPressEnter } = this.props;
      const { value } = this.state;
      this.timeout = window.setTimeout(() => {
        onPressEnter(value); // Fix duplicate onPressEnter
      }, 0);
    }
  };

  onChange: AutoCompleteProps['onChange'] = value => {
    if (typeof value === 'string') {
      const { onSearch, onChange } = this.props;
      this.setState({ value });
      if (onSearch) {
        onSearch(value);
      }
      if (onChange) {
        onChange(value);
      }
    }
  };

  enterSearchMode = () => {
    const { onVisibleChange } = this.props;
    onVisibleChange(true);
    this.setState({ searchMode: true }, () => {
      const { searchMode } = this.state;
      if (searchMode && this.inputRef) {
        this.inputRef.focus();
      }
    });
  };

  leaveSearchMode = () => {
    this.setState({
      searchMode: false,
      value: '',
    });
  };

  debouncePressEnter = () => {
    const { onPressEnter } = this.props;
    const { value } = this.state;
    onPressEnter(value);
  };

  render() {
    const { className, placeholder, open, ...restProps } = this.props;
    const { searchMode, value } = this.state;
    delete restProps.defaultOpen; // for rc-select not affected
    const inputClass = classNames(styles.input, {
      [styles.show]: searchMode,
    });

    return (
      <span
        className={classNames(className, styles.headerSearch)}
        onClick={this.enterSearchMode}
        onTransitionEnd={({ propertyName }) => {
          if (propertyName === 'width' && !searchMode) {
            const { onVisibleChange } = this.props;
            onVisibleChange(searchMode);
          }
        }}
      >
        <Icon type="search" key="Icon" />
        <AutoComplete
          key="AutoComplete"
          {...restProps}
          className={inputClass}
          value={value}
          onChange={this.onChange}
        >
          <Input
            ref={node => {
              this.inputRef = node;
            }}
            aria-label={placeholder}
            placeholder={placeholder}
            onKeyDown={this.onKeyDown}
            onBlur={this.leaveSearchMode}
          />
        </AutoComplete>
      </span>
    );
  }
}
