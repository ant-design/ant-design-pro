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

  selectChangeItem = item => {
    const { onChange } = this.props;
    onChange(item);
  };

  render() {
    // const value = this.conversionObject();
    const { value,style,groupList } = this.props;
    // console.log("data:",groupList);
    const treeSelectData=[{title:`0-root group`,value:0,key:0, children: []}];
    if(groupList){
      console.log("groupList:",groupList)
      flatToGroupTreeSelect(groupList,treeSelectData,0);
    }
    // console.log("data:",groupList);
    // console.log("treeSelectData:",treeSelectData);
    return (
      <TreeSelect
        style={style}
        value={value||'0'}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={treeSelectData}
        placeholder="Please select"
        showSearch
        treeNodeFilterProp='title'
        onChange={this.selectChangeItem}
      />
    );
  }
}

export default GroupTreeSelectView;
