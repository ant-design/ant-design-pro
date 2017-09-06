import React from 'react';
import { Button, Input } from 'antd';

import styles from './index.less';

export default class SearchInput extends React.Component {
  state = {
    value: this.props.defaultValue,
  }

  handleOnChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  handleOnSearch = () => {
    if (this.props.onSearch) {
      this.props.onSearch(this.state.value);
    }
  }

  handleOnKey = (e) => {
    if (e.keyCode === 13) {
      this.handleOnSearch();
    }
  }

  render() {
    const { text = '搜索', reset } = this.props;
    return (
      <div className={styles.search}>
        <Input
          onKeyDown={this.handleOnKey}
          placeholder="请输入"
          size="large"
          {...reset}
          value={this.state.value}
          onChange={this.handleOnChange}
          addonAfter={<Button onClick={this.handleOnSearch} type="primary">{text}</Button>}
        />
      </div>
    );
  }
}
