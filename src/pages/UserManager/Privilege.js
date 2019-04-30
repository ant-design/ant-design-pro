import React, {PureComponent} from 'react';
import {Divider} from 'antd';
import {connect} from 'dva';
import BindDataQueryTable from '../BindDataQueryTable';
import QueryCommand from '@/components/QueryTable/QueryCommand';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getItems } from '@/utils/masterData';
import RoleTransfer from "./RoleTransfer";
import {flatToTree} from "./userUtil"

const statusList = getItems('common', 'status');
const iconList = getItems('privilege', 'icon');
iconList.push({javaCode:'privilege',javaKey:'icon',itemCode:'',itemValue:'无'});
const typeList = getItems('privilege', 'type');

const hideChildrenInMenuList = getItems('privilege', 'hide_children_in_menu');
const hideInMenuList = getItems('privilege', 'hide_in_menu');
console.log(hideChildrenInMenuList);
const columnSchemas = {
  tableName: 'sys_privilege',
  key: 'privilegeId',
  name: 'name',
  commands:[{action:'setRole',title:'角色'},],
  columnDetails: [
    { name: 'privilegeId', title: 'ID', add: true, disabledAct:'true', width:80 },
    { name: 'name', title: 'Name', columnHidden: true, query: true, add: true },
    {
      name: 'type',
      title: 'type',
      query: true,
      add: true,
      tag: 'commonSelect',
      enumData: typeList,
    },
    { name: 'path', title: 'path', sorter: true, query: true, add: true},
    { name: 'shortRoleStr', title: 'role', },
    {
      name: 'icon',
      title: 'icon',
      columnHidden: true,
      query: false,
      add: true,
      tag: 'commonSelect',
      enumData: iconList,
      rules:[],
    },
    {
      name: 'hideChildrenInMenu',
      title: 'hideChildrenInMenu',
      columnHidden: true,
      query: false,
      add: true,
      tag: 'commonRadio',
      enumData: hideChildrenInMenuList,
      rules:[],
    },
    {
      name: 'hideInMenu',
      title: 'hideInMenu',
      columnHidden: true,
      query: false,
      add: true,
      tag: 'commonRadio',
      enumData: hideInMenuList,
      rules:[],
    },
    {
      name: 'status',
      title: 'Status',
      columnHidden: false,
      query: false,
      add: false,
      tag: 'commonSelect',
      enumData: statusList,
    },
    { name: 'remark', title: 'remark',tag:'textArea',columnHidden: true, add: true,rows:3,rules:[] },
  ],
};


@connect(({ uniComp, loading }) => ({
  uniComp,
  loading: loading.models.uniComp,
}))
class Privilege extends PureComponent {

  state={
    selectedRow:undefined,
    modalVisible:false,
  }

  handleRole=()=>{
    const {selectedRow}=this.state;
    // message.success(action);
    if(selectedRow) {
      // message.success(selectedRow.name);
      this.setState({
        modalVisible: true,
      });
    }
  }

  handleConversionData=(list)=>{
    const newData=[];
    const newList=list.map((item)=>{
      if(item.sysPrivilegeRoles){
        const roleArr=item.sysPrivilegeRoles.map((arr)=>{
          return arr.roleName;
        })
        const roleStr=roleArr.join(',');
        let shortRoleStr=roleStr;
        if(shortRoleStr.length>=16){
          shortRoleStr=`${shortRoleStr.substr(0,14)}...`;
        }
        return {...item,roleStr,shortRoleStr};
      }
      return item;
    });
    flatToTree(newList,newData,0);
    console.log("-----flat to tree---5",newData);
    return newData;
  }

  handleVisible=(modalVisible)=>{
    // console.log("---modalVisible＝＝＝＝3:",modalVisible);
    this.setState({modalVisible});
  }

  render() {
    const {modalVisible,selectedRow}=this.state;
    return (
      <PageHeaderWrapper title="权限管理">
        <BindDataQueryTable
          columnSchemas={columnSchemas}
          pageSize='999'
          size='small'
          onConversionData={this.handleConversionData}
          onRow={(record) => {
            return {
              // onClick: (event) => {message.success("1")},       // 点击行
              // onDoubleClick: (event) => {},
              // onContextMenu: (event) => {},
              onMouseEnter: () => {this.setState({selectedRow:record});},  // 鼠标移入行
              // onMouseLeave: (event) => {console.log(12)}
            };
          }}
        >
          <QueryCommand>
            <Divider type="vertical" />
            <a onClick={() => this.handleRole()}>角色</a>
          </QueryCommand>
        </BindDataQueryTable>
        <RoleTransfer
          title='授权'
          modalVisible={modalVisible}
          onVisible={this.handleVisible}
          columnSchemas={columnSchemas}
          selectedRow={selectedRow}
          keyName='roleId'
          relationName='sysPrivilegeRoles'
        />
      </PageHeaderWrapper>
    );
  }
}
export default Privilege;
