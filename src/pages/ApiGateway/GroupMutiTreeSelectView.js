import React, { PureComponent } from 'react';
import { TreeSelect } from 'antd';
import { connect } from 'dva';
import {flatToGroupTreeSelect,} from "../UserManager/userUtil"

@connect(({ groupModel, loading }) => ({
  groupModel,
  groupList: groupModel.groupList,
  loading: loading.models.groupModel,
}))
class GroupTreeSelectView extends PureComponent {

  state = {
    value: undefined,
  };

  componentWillMount() {
    console.log("-----will mount")
    const {dispatch} = this.props;
    // 分组列表
    dispatch({
      type: 'groupModel/allGroupList',
      // callback: (groupList) => {
      //   const columns = this.getColumns(groupList);
      //   this.setState({columns});
      // },
    });
  }

  onChange = value => {
    console.log(value);
    this.setState({ value });
    const { onChange } = this.props;
    onChange(value);
  };

  render() {
    // const value = this.conversionObject();

    const { value } = this.state;
    const { style,groupList } = this.props;
    const treeSelectData=[];
    if(groupList){
      flatToGroupTreeSelect(groupList,treeSelectData,0);
    }
    // console.log("data:",groupList);
    // console.log("treeSelectData:",treeSelectData);
    return (
      <TreeSelect
        style={style}
        value={value||null}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={treeSelectData}
        placeholder="please choose"
        showSearch
        treeNodeFilterProp='title'
        onChange={this.onChange}
        multiple
        allowClear
        treeDefaultExpandAll
      />
    );
  }
}

export default GroupTreeSelectView;
