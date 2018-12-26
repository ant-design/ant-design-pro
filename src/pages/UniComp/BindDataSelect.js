import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { connect } from 'dva';

@connect(({ componentModel, loading }) => ({
  componentModel,
  loading: loading.models.componentModel,
}))
class BindDataSelect extends PureComponent {
  state = {
    uniList: [],
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

  render() {
    return <Select />;
  }
}
export default BindDataSelect;
