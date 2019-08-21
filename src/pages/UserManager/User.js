import React, {PureComponent} from 'react';
import {Divider} from 'antd';
import {connect} from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import BindDataQueryTable from '../BindDataQueryTable';
import QueryCommand from '@/components/QueryTable/QueryCommand';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getItems } from '@/utils/masterData';
import RoleTransfer from "./RoleTransfer";

import Authorized from '@/utils/Authorized';
import { getAuth } from '@/utils/authority';

const { check } = Authorized;

@connect(({ uniComp, loading }) => ({
  uniComp,
  loading: loading.models.uniComp,
}))
class User extends PureComponent {

  state={
    selectedRow:undefined,
    modalVisible:false,
    columnSchemas:{},
  }

  componentWillMount() {

    const statusList = getItems('common', 'status');// 用户状态
    const utypeList = getItems('sysUser', 'utype');// 账户类型
    console.log("------utypeList",utypeList,statusList);
    const auth=getAuth("user_save"); // 获取某个功能权的角色
    const saveAct = check(auth,'Modify'); // 检查某个功能权的权限，如果有权限，返回第二个参数的值作为展现内容
    const commandAct = check(auth,'Role');
// 动作对象
    const actions=saveAct||commandAct?{
      title:'action',
      width:130,
      saveAct,
      commandAct,
      havePermissions:true,
      haveAddPermissions:true,
    }:{havePermissions:false,
      haveAddPermissions:false,};

    const columnSchemas = {
      tableName: 'sys_user',
      key: 'id',
      name: 'username',
      relationKey: 'userId',
      commands:[{action:'setRole',title:'角色'},],
      columnDetails: [
        { name: 'id', title: formatMessage({'id':'app.user.sys_user.id'}), add: true, disabledAct:'true' },
        { name: 'username', title: formatMessage({'id':'app.user.sys_user.username'}), sorter: true, query: true, add: true, detailFlag:1 },
        {
          name: 'utype',
          title: formatMessage({'id':'app.user.sys_user.utype'}),
          columnHidden: false,
          query: true,
          add: true,
          tag: 'commonSelect',
          enumData: utypeList,
        },
        { name: 'password', title: formatMessage({'id':'app.user.sys_user.password'}),tag:'passwordTag', add: true, columnHidden: true,detail:false },
        { name: 'email', title: formatMessage({'id':'app.user.sys_user.email'}), query: false, add: true ,rules:[]},
        { name: 'tel', title: formatMessage({'id':'app.user.sys_user.tel'}), query: false, add: true ,rules:[]},
        {
          name: 'status',
          title: formatMessage({'id':'app.user.sys_user.status'}),
          columnHidden: false,
          query: false,
          add: false,
          tag: 'commonSelect',
          enumData: statusList,
        },
        { name: 'remark', title: formatMessage({'id':'app.user.sys_user.remark'}),tag:'textArea',columnHidden: true, add: true,rows:3,rules:[] },
      ],
      relations:[{
        name:'sysUserRoles',
        key: 'id',
        title:formatMessage({'id':'app.user.sys_user.sysUserRoles'}),
        columnDetails:[{name: 'id',title:formatMessage({'id':'app.user.sys_role.id'})},
          {name: 'roleId',title:formatMessage({'id':'app.user.sys_user.roleId'})},
          {name: 'roleName',title:formatMessage({'id':'app.user.sys_user.roleName'})}]
      }],
      actions,
    };
    this.setState({columnSchemas});
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
    const {modalVisible,selectedRow,columnSchemas}=this.state;
    return (
      <PageHeaderWrapper>
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
          title='Grant authorization'
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
