import React, {PureComponent} from 'react';
import {Divider} from 'antd';
import {connect} from 'dva';
import BindDataQueryTable from '../BindDataQueryTable';
import QueryCommand from '@/components/QueryTable/QueryCommand';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getItems } from '@/utils/masterData';
import RoleTransfer from "./RoleTransfer";
import {flatToPrivilegeTreeSelect, flatToTree,} from "./userUtil"

const statusList = getItems('common', 'status'); // 状态主数据
const iconList = getItems('privilege', 'icon');  // 菜单图标祝数据
iconList.push({javaCode:'privilege',javaKey:'icon',itemCode:'',itemValue:'无'});
const typeList = getItems('privilege', 'type');  // 菜单类型主数据

const hideChildrenInMenuList = getItems('privilege', 'hide_children_in_menu'); // 子菜单是否隐藏主数据
const hideInMenuList = getItems('privilege', 'hide_in_menu');// 菜单是否隐藏主数据

// 表格信息、展现信息、动作信息等
const columnSchemas = {
  tableName: 'sys_privilege',
  key: 'privilegeId',
  name: 'name',
  commands:[{action:'setRole',title:'角色'},],
  columnDetails: [
    { name: 'privilegeId', title: 'ID', add: true, disabledAct:'true', width:110 },
    { name: 'name', title: 'Name', columnHidden: false, query: true, add: true },
    { name: 'shortPathStr', title: 'Path', },
    { name: 'path', title: 'path', columnHidden: true, query: true, add: true},
    { name: 'parentPrivilegeId', title: 'parent', add: true, tag:'privilegeTreeSelect', columnHidden: true,rules:[]},
    {
      name: 'type',
      title: 'type',
      query: true,
      add: true,
      tag: 'commonSelect',
      enumData: typeList,
    },
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

  // componentDidMount() {
  //   // console.log('============2componentDidMount========');
  //   this.handlePrivilegeSearch();
  // }
  //
  // handlePrivilegeSearch = () => {
  //
  //   const {
  //     dispatch,
  //   } = this.props;
  //
  //   const params = {
  //     tableName:'sys_privilege',
  //     data:{
  //       info:{
  //         pageNo: 1,
  //         pageSize: 999,
  //       }
  //     }
  //   };
  //   dispatch({
  //     type: 'uniComp/list',
  //     payload:params,
  //   });
  // };

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

  // 轉換list裡面的value
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
        let shortPathStr=item.path;
        if(shortPathStr.length>=25){
          shortPathStr=`${shortPathStr.substr(0,22)}...`;
        }
        return {...item,roleStr,shortRoleStr,shortPathStr};
      }
      return item;
    });
    if(newList.length>50){
      flatToTree(newList,newData,0);
      // console.log("-----flat to tree---5",newData);
      return newData;
    }
    return newList;
  }

  // 获取treeselect的数据
  handleTreeSelectData=(list)=>{
    const privilegeTreeDataForSelect=[];
    flatToPrivilegeTreeSelect(list,privilegeTreeDataForSelect,0);
    return privilegeTreeDataForSelect;
  }

  handleVisible=(modalVisible)=>{
    // console.log("---modalVisible＝＝＝＝3:",modalVisible);
    this.setState({modalVisible});
  }
  
  handleRefreshData=()=>{
    // console.log("-----2222222---5");
    this.child.handleSearchDefault()
  }

  handleRef = (ref) => {
    this.child = ref
  }

  render() {
    const {modalVisible,selectedRow}=this.state;
    // const {data:{list}}=this.props;
    // const treeSelectData=[];
    // if(list){
    //   flatToPrivilegeTreeSelect(list,treeSelectData,0);
    // }
    return (
      <PageHeaderWrapper title="权限管理">
        <BindDataQueryTable
          columnSchemas={columnSchemas}
          pageSize='999'
          size='small'
          onConversionData={this.handleConversionData}
          onRef={this.handleRef}
          onRow={(record) => {
            return {
              // onClick: (event) => {message.success("1")},       // 点击行
              // onDoubleClick: (event) => {},
              // onContextMenu: (event) => {},
              onMouseEnter: () => {this.setState({selectedRow:record});},  // 鼠标移入行
              // onMouseLeave: (event) => {// console.log(12)}
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
          onRefreshData={this.handleRefreshData}
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
