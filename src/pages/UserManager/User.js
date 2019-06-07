import React, {PureComponent} from 'react';
import {Divider} from 'antd';
import {connect} from 'dva';
import BindDataQueryTable from '../BindDataQueryTable';
import QueryCommand from '@/components/QueryTable/QueryCommand';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getItems } from '@/utils/masterData';
import RoleTransfer from "./RoleTransfer";

import Authorized from '@/utils/Authorized';
import { getAuth } from '@/utils/authority';

const { check } = Authorized;

const statusList = getItems('common', 'status');// 用户状态
const utypeList = getItems('sysUser', 'utype');// 账户类型

const auth=getAuth("user_save"); // 获取某个功能权的角色
const saveAct = check(auth,'modify'); // 检查某个功能权的权限，如果有权限，返回第二个参数的值作为展现内容
const commandAct = check(auth,'role');
// 动作对象
const actions=saveAct||commandAct?{
  title:'action',
  width:130,
  saveAct,
  commandAct,
  havePermissions:true,
}:{havePermissions:false};

const columnSchemas = {
  tableName: 'sys_user',
  key: 'id',
  name: 'username',
  relationKey: 'userId',
  commands:[{action:'setRole',title:'角色'},],
  columnDetails: [
    { name: 'id', title: 'User ID', add: true, disabledAct:'true' },
    { name: 'username', title: 'User Name', sorter: true, query: true, add: true, detailFlag:1 },
    {
      name: 'utype',
      title: 'Account Type',
      columnHidden: false,
      query: true,
      add: true,
      tag: 'commonSelect',
      enumData: utypeList,
    },
    { name: 'password', title: 'Password',tag:'passwordTag', add: true, columnHidden: true,detail:false },
    { name: 'email', title: 'Email', query: false, add: true ,rules:[]},
    { name: 'tel', title: 'Mobile', query: false, add: true ,rules:[]},
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
  relations:[{
    name:'sysUserRoles',
    key: 'id',
    title:'Role List of this User',
    columnDetails:[{name: 'id',title:'Relation Id'},{name: 'roleId',title:'Role Id'},{name: 'roleName',title:'Role Name'}]
  }],
  actions,
};


@connect(({ uniComp, loading }) => ({
  uniComp,
  loading: loading.models.uniComp,
}))
class User extends PureComponent {

  state={
    selectedRow:undefined,
    modalVisible:false,
  }

  handleRole=()=>{
    const {selectedRow}=this.state;
    // message.success(selectedRow);
    if(selectedRow) {
      // message.success(selectedRow.username);
      this.setState({
        modalVisible: true,
      });
    }
  }

  handleVisible=(modalVisible)=>{
    // console.log("---modalVisible＝＝＝＝3:",modalVisible);
    this.setState({modalVisible});
  }

  handleRefreshData=()=>{
    this.child.handleSearchDefault()
  }

  handleRef = (ref) => {
    this.child = ref
  }


  render() {
    const {modalVisible,selectedRow}=this.state;
    return (
      <PageHeaderWrapper title="用户管理" showBreadcrumb>
        <BindDataQueryTable
          columnSchemas={columnSchemas}
          onRef={this.handleRef}
          size='middle'
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
            <a onClick={() => this.handleRole()}>Role</a>
          </QueryCommand>
        </BindDataQueryTable>
        <RoleTransfer
          title='授权'
          modalVisible={modalVisible}
          onVisible={this.handleVisible}
          columnSchemas={columnSchemas}
          selectedRow={selectedRow}
          onRefreshData={this.handleRefreshData}
          keyName='roleId'
          relationName='sysUserRoles'
        />
      </PageHeaderWrapper>
    );
  }
}
export default User;
