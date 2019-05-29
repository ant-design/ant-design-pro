import React, { PureComponent } from 'react';
import { Divider } from 'antd';
import BindDataQueryTable from '../BindDataQueryTable';
import QueryCommand from '@/components/QueryTable/QueryCommand';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getItems } from '@/utils/masterData';
import UserTransfer from './UserTransfer';

import Authorized from '@/utils/Authorized';
import { getAuth } from '@/utils/authority';

const { check } = Authorized;

const auth = getAuth('org_save'); // 获取某个功能权的角色
const saveAct = check(auth, 'modify'); // 检查某个功能权的权限，如果有权限，返回第二个参数的值作为展现内容
const commandAct = check(auth, 'role');

// 动作对象
const actions =
  saveAct || commandAct
    ? {
        title: 'action',
        width: 130,
        saveAct,
        commandAct,
        havePermissions: true,
      }
    : { havePermissions: false };

// const orgTypes = [
//   { itemCode: '1', itemValue: '生产系统' },
//   { itemCode: '2', itemValue: '消费系统' },
//   { itemCode: '0', itemValue: 'Both' },
// ];
const orgTypes = getItems('org', 'org_type'); // 缓存取数据
const authTypes = getItems('org', 'auth_type');
const statusList = getItems('common', 'status');
console.log(orgTypes, authTypes);
const columnSchemas = {
  tableName: 'org',
  key: 'id',
  name: 'orgName',
  columnDetails: [
    { name: 'appkey', title: 'App Key', query: true }, // name  数据库属性 query查询是否显示 add 新增 ,disableAct修改, rules 输入规则 tag下拉框
    { name: 'id', title: 'ID', columnHidden: false, add: true, disabledAct: 'true' }, // 第一列需要作为查询条件，新增时不需要采集
    { name: 'orgCode', title: 'Code' }, // 第二列需要作为查询条件，新增时需要采集
    { name: 'orgName', title: 'Name', sorter: true, query: true, add: true }, //  需要排序，需要作为查询条件，新增时需要采集
    { name: 'createTime', title: 'Create Date', format: 'YYYY-MM-DD HH:mm:ss' }, // 返回是日期类型，需要转换
    { name: 'tel', title: 'tel', columnHidden: true, add: true, rules: [] },
    { name: 'email', title: 'email', columnHidden: true, add: true, rules: [] },
    {
      name: 'authType',
      title: 'Auth Type',
      columnHidden: false,
      add: true,
      tag: 'commonSelect',
      tableName: 'org',
      query: true,
      enumData: authTypes,
    },
    {
      name: 'orgType',
      title: 'Org Type',
      columnHidden: false,
      query: true,
      add: true,
      tag: 'commonSelect',
      tableName: 'org',
      enumData: orgTypes,
    }, // 需要作为查询条件，新增时需要采集，需要使用绑定的下拉标签
    {
      name: 'status',
      title: 'Status',
      columnHidden: false,
      query: false,
      add: true,
      tag: 'commonSelect',
      tableName: 'org',
      enumData: statusList,
    }, // 需要作为查询条件，新增时需要采集，需要使用绑定的下拉标签
    {
      name: 'remark',
      title: 'remark',
      tag: 'textArea',
      columnHidden: true,
      add: true,
      rows: 3,
      rules: [],
    },
  ],
  actions,
};

class Org extends PureComponent {
  state = {
    selectedRow: undefined,
    modalVisible: false,
  };

  handleUser = () => {
    const { selectedRow } = this.state;
    // message.success(selectedRow);
    if (selectedRow) {
      // message.success(selectedRow.username);
      this.setState({
        modalVisible: true,
      });
    }
  };

  handleVisible = modalVisible => {
    // console.log("---modalVisible＝＝＝＝3:",modalVisible);
    this.setState({ modalVisible });
  };

  handleRefreshData = () => {
    this.child.handleSearchDefault();
  };

  handleRef = ref => {
    this.child = ref;
  };

  render() {
    const { modalVisible, selectedRow } = this.state;
    return (
      <PageHeaderWrapper title="权限管理">
        <BindDataQueryTable
          columnSchemas={columnSchemas}
          onRef={this.handleRef}
          size="middle"
          onRow={record => {
            return {
              // onClick: (event) => {message.success("1")},       // 点击行
              // onDoubleClick: (event) => {},
              // onContextMenu: (event) => {},
              onMouseEnter: () => {
                this.setState({ selectedRow: record });
              }, // 鼠标移入行
              // onMouseLeave: (event) => {console.log(12)}
            };
          }}
        >
          <QueryCommand>
            <Divider type="vertical" />
            <a onClick={() => this.handleUser()}>Select User</a>
          </QueryCommand>
        </BindDataQueryTable>
        <UserTransfer
          title="授权"
          modalVisible={modalVisible}
          onVisible={this.handleVisible}
          columnSchemas={columnSchemas}
          selectedRow={selectedRow}
          onRefreshData={this.handleRefreshData}
          keyName="id"
          relationName="sysUserOrgs" // 选中的关联表
        />
      </PageHeaderWrapper>
    );
  }
}
export default Org;
// export default () => (
//   <PageHeaderWrapper title="接入系统管理">
//     <BindDataQueryTable columnSchemas={columnSchemas} />
//   </PageHeaderWrapper>
// );
