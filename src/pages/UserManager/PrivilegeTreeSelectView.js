import React, { PureComponent } from 'react';
import { TreeSelect } from 'antd';
import { connect } from 'dva';
import {flatToPrivilegeTreeSelect,} from "./userUtil"

@connect(({ privilegeModel, loading }) => ({
  privilegeModel,
  loading: loading.models.privilegeModel,
}))
class PrivilegeTreeSelectView extends PureComponent {

  componentDidMount() {
    // console.log('============2componentDidMount========');
    this.handleSearch();
  }

  handleSearch = () => {

    const {
      dispatch,
    } = this.props;

    const params = {
      tableName:'sys_privilege',
      data:{
        info:{
          pageNo: 1,
          pageSize: 999,
        }
      }
    };
    dispatch({
      type: 'privilegeModel/list',
      payload:params,
    });
  };

  selectChangeItem = item => {
    const { onChange } = this.props;
    onChange(item);
  };

  render() {
    // const value = this.conversionObject();
    const { value,style,privilegeModel: { data } } = this.props;
    const treeSelectData=[{title:`0-root node`,value:0,key:0, children: []}];
    if(data&&data.list){
      flatToPrivilegeTreeSelect(data.list,treeSelectData,0);
    }
    console.log("data:",data);
    console.log("treeSelectData:",treeSelectData);
    return (
      <TreeSelect
        style={style}
        value={value||'0'}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={treeSelectData}
        placeholder="Please select"
        showSearch
        treeNodeFilterProp='title'
        onSelect={this.selectChangeItem}
      />
    );
  }
}

export default PrivilegeTreeSelectView;
