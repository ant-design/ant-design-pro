import React, {PureComponent} from 'react';
import {BackTop} from 'antd';
import BindDataQueryTable from '../BindDataQueryTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getItems } from '@/utils/masterData';
import { flatToGroupTree,} from "../UserManager/userUtil"
import {getUserId} from "../../utils/authority";

class Group extends PureComponent {

  state={
    columnSchemas:{},
  }

  componentWillMount() {

    const statusList = getItems('common', 'status'); // 状态主数据
    const userId = getUserId();
    const columnSchemas = {
      tableName: 'api_group',
      key: 'groupId',
      name: 'groupName',
      privileges:['group_save','group_statusBatch'],
      userId,
      columnDetails: [
        { name: 'groupId', title: 'Group ID', add: true, disabledAct:'true' }, // 第一列需要作为查询条件，新增时不需要采集
        { name: 'groupName', title: 'Group Name', sorter: true, query: true, add: true }, //  需要排序，需要作为查询条件，新增时需要采集
        { name: 'parentGroupId', title: 'parent', add: true, tag:'groupTreeSelect', detail:false, columnHidden: true,rules:[],defaultValue:'0'},
        {
          name: 'status',
          title: 'Status',
          columnHidden: false,
          query: false,
          add: true,
          tag: 'commonSelect',
          tableName: 'group',
          enumData: statusList,
        }, // 需要作为查询条件，新增时需要采集，需要使用绑定的下拉标签
        { name: 'groupDesc', title: 'Group Desc',tag:'textArea',columnHidden: true, add: true,rows:3,rules:[] },
      ]
    };
    this.setState({columnSchemas});
  }


  // 轉換list裡面的value
  handleConversionData=(list)=>{
    const newData=[];
    console.log("-----flat to tree---list:",list);
    if(list.length>5){
      flatToGroupTree(list,newData,0);
      console.log("-----flat to tree---5",newData);
      return newData;
    }
    return list;
  }


  render() {
    const {columnSchemas}=this.state;
    // const {data:{list}}=this.props;
    // const treeSelectData=[];
    // if(list){
    //   flatToPrivilegeTreeSelect(list,treeSelectData,0);
    // }
    return (
      <PageHeaderWrapper>
        <BindDataQueryTable
          columnSchemas={columnSchemas}
          pageSize='999'
          size='small'
          onConversionData={this.handleConversionData}
        />
        <BackTop />
      </PageHeaderWrapper>
    );
  }
}
export default Group;
