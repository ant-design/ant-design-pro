import React, {PureComponent} from 'react';
import {Divider} from 'antd';
import {connect} from 'dva';
import BindDataQueryTable from '../BindDataQueryTable';
import QueryCommand from '@/components/QueryTable/QueryCommand';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getItems } from '@/utils/masterData';
import RoleTransfer from "./RoleTransfer";

const statusList = getItems('common', 'status');
const utypeList = getItems('sysUser', 'utype');

const columnSchemas = {
  tableName: 'sys_user',
  key: 'id',
  name: 'username',
  commands:[{action:'setRole',title:'角色'},],
  columnDetails: [
    { name: 'id', title: 'User ID', add: true, disabledAct:'true' },
    { name: 'username', title: 'User Name', sorter: true, query: true, add: true },
    {
      name: 'utype',
      title: 'Account Type',
      columnHidden: false,
      query: false,
      add: false,
      tag: 'commonSelect',
      enumData: utypeList,
    },
    { name: 'password', title: 'Password',tag:'password', add: true },
    { name: 'email', title: 'Email', query: true, add: true ,rules:[]},
    { name: 'tel', title: 'Mobile', query: true, add: true ,rules:[]},
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


  render() {
    const {modalVisible,selectedRow}=this.state;
    return (
      <PageHeaderWrapper title="账户管理">
        <BindDataQueryTable
          columnSchemas={columnSchemas}
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
          relationName='sysUserRoles'
        />
      </PageHeaderWrapper>
    );
  }
}
export default User;
