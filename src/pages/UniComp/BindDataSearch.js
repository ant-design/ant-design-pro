import { Select } from 'antd';
import { connect } from 'dva';

import React, { PureComponent } from 'react';
// import querystring from 'querystring';
const { Option } = Select;
@connect(({ componentModel, loading }) => ({
  componentModel,
  loading: loading.models.componentModel,
}))
class BindDataSearch extends PureComponent {
  state = {
    value: '',
    options: [],
  };

  timer = 0;

  componentWillMount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.fetchList();
      this.timer = 0;
    }, 200);
  }

  componentWillReceiveProps(nextProps) {
    const { resetFlag } = this.props;
    if (resetFlag !== nextProps.resetFlag) {
      this.state.value = '';
      this.fetchList('');
    }
  }

  handleChange = value => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.fetchList(value);
      this.timer = 0;
    }, 200);
    this.setState({ value });
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  fetchList(value) {
    this.setState({ options: [] });
    const {
      tableInfo: { tableName },
    } = this.props;
    const { dispatch } = this.props;
    // console.log("value====",value.split(':')[0],value);
    const params = {
      q: value,
      t: tableName,
    };
    dispatch({
      type: 'componentModel/sug',
      payload: params,
      callback: §
        if (resp.list) {
          const {
            showId,
            tableInfo: { id, title },
          } = this.props;
          const options = resp.list.map(d => (
            <Option
              value={showId ? `${d[id]}:${d[title]}` : d[id]}
              key={showId ? `${d[id]}:${d[id]}:${d[title]}` : `${d[id]}:${d[id]}`}
            >
              {showId ? `${d[id]}:${d[title]}` : d[title]}
            </Option>
          ));
          this.setState({ options });
        }
      },
    });
  }

  render() {
    const { value, options } = this.state;
    const { placeholder, style } = this.props;
    return (
      <Select
        mode="combobox"
        key="`select_{this.props.tableInfo.tableName}`"
        value={value}
        placeholder={placeholder}
        style={style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onChange={this.handleChange}
      >
        {options}
      </Select>
    );
  }
}
export default BindDataSearch;
