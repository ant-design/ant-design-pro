import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { connect } from 'dva';

const { Option } = Select;

@connect(({ componentModel, loading }) => ({
  componentModel,
  loading: loading.models.componentModel,
}))
class BindDataSelect extends PureComponent {
  state = {
    uniList: [],
    value: '',
  };

  // componentWillMount() {
  //   // 需要赋值，才能获取外面传入的初始化值
  //   // this.setState是异步的，不会马上更新state的值
  //   // this.state.value=this.props.value;这个会马上更新，但是有些地方说不能这样直接赋值
  //   // setState不能放在componentDidMount
  //   console.log("componentWillMount props",this.props)
  //   this.setState({
  //     value: this.props.value,
  //   });
  //   this.state.value=this.props.value;
  // }

  componentDidMount() {
    // console.log("componentDidMount");
    // console.log("componentDidMount");
    this.state.uniList = [];
    this.fetchList();
  }

  fetchList = value => {
    const { tableName } = this.props;
    const { dispatch } = this.props;
    const params = {
      q: value,
      t: tableName,
    };
    dispatch({
      type: 'componentModel/sug',
      payload: params,
    });
  };

  handleChange = value => {
    this.setState({ value });
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  render() {
    const {
      componentModel: { mutiData },
      showId,
      tableName,
      tableKey,
      tableTitle,
      value,
    } = this.props;
    this.state.value = value;
    const uniList = mutiData[tableName] ? mutiData[tableName].list : [];
    this.state.uniList = uniList;
    const options = uniList.map(d => (
      <Option
        value={showId ? `${d[tableKey]}:${d[tableTitle]}` : d[tableKey]}
        key={showId ? `${d[tableKey]}:${d[tableTitle]}` : d[tableKey]}
      >
        {showId ? `${d[tableKey]}:${d[tableTitle]}` : d[tableTitle]}
      </Option>
    ));

    return (
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="请输入"
        optionFilterProp="children"
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        value={value}
      >
        {options}
      </Select>
    );
  }
}
export default BindDataSelect;
