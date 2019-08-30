import React, { PureComponent } from 'react';
import { TreeSelect } from 'antd';
import { connect } from 'dva';
import {flatToGroupTreeSelect,} from "../UserManager/userUtil"
import {getUserId} from "../../utils/authority";

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
    const userId = getUserId();
    const payload = {userId};
    dispatch({
      type: 'groupModel/allGroupList',
      payload
    });
  }

  selectChangeItem = item => {
    const { onChange } = this.props;
    onChange(item);
  };

  render() {

    // const value = this.conversionObject();
    const { value,style,groupList,firstTitle,hideRoot,isDisabled,...restProps } = this.props;
    const defalultValue=hideRoot?value:value||'0';
    // console.log("data:",groupList);
    const treeSelectData=hideRoot?[]:[{title:firstTitle||`0-root group`,value:0,key:0, children: []}];
    if(groupList){
      console.log("groupList:",groupList);
      flatToGroupTreeSelect(groupList,treeSelectData,0,isDisabled);
    }
    // console.log("data:",groupList);
    // console.log("treeSelectData:",treeSelectData);
    return (
      <TreeSelect
        style={style}
        value={defalultValue}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={treeSelectData}
        placeholder="Please choose a group"
        showSearch
        treeNodeFilterProp='title'
        onChange={this.selectChangeItem}
        {...restProps}
      />
    );
  }
}

export default GroupTreeSelectView;
