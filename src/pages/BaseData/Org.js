import React, {PureComponent} from 'react';
import {Divider, message} from 'antd';
import BindDataQueryTable from '../BindDataQueryTable';
import QueryCommand from '@/components/QueryTable/QueryCommand';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {getItems} from '@/utils/masterData';
import UserTransfer from './UserTransfer';

import Authorized from '@/utils/Authorized';
import {getAuth, getUserId, getUserName} from '@/utils/authority';

const { check } = Authorized;

class Org extends PureComponent {
  state = {
    selectedRow: undefined,
    modalVisible: false,
    columnSchemas: {},
  };

  componentWillMount() {
    const auth = getAuth('org_save'); // 获取某个功能权的角色
    const saveAct = check(auth, 'Modify'); // 检查某个功能权的权限，如果有权限，返回第二个参数的值作为展现内容
    const commandAct = check(auth, 'role');

    // 动作对象
    const actions =
      saveAct || commandAct
        ? {
            title: 'action',
            width: 160,
            saveAct,
            commandAct,
            havePermissions: true,
            haveAddPermissions: true,
          }
        : { havePermissions: false, haveAddPermissions: false };

    const orgTypes = getItems('org', 'org_type'); // 缓存取数据
    const authTypes = getItems('org', 'auth_type');
    const statusList = getItems('common', 'status');

    const columnSchemas = {
      tableName: 'org',
      key: 'id',
      name: 'orgName',
      columnDetails: [
        { name: 'appkey', title: 'App Key', query: true, detailFlag: 1 }, // name  数据库属性 query查询是否显示 add 新增 ,disableAct修改, rules 输入规则 tag下拉框
        { name: 'id', title: 'ID', columnHidden: false, add: true, disabledAct: 'true' }, // 第一列需要作为查询条件，新增时不需要采集
        { name: 'orgCode', title: 'Code', columnHidden: true }, // 第二列需要作为查询条件，新增时需要采集
        { name: 'orgName', title: 'Name', sorter: true, query: true, add: true }, //  需要排序，需要作为查询条件，新增时需要采集
        { name: 'createTime', title: 'Create Date', format: 'YYYY-MM-DD HH:mm:ss' }, // 返回是日期类型，需要转换
        { name: 'tel', title: 'tel', columnHidden: true, add: true, rules: [] },
        { name: 'email', title: 'email', columnHidden: true, add: true, rules: [] },
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
          name: 'authType',
          title: 'Auth Type of Consumer',
          columnHidden: false,
          add: true,
          tag: 'commonSelect',
          tableName: 'org',
          query: true,
          enumData: authTypes,
        },
        {
          name: 'tokenExpireTime',
          title: 'Token Valid Day',
          columnHidden: true,
          add: true,
          defaultValue:'30',
        },
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
      relations: [
        {
          name: 'sysUserOrgs',
          key: 'id',
          title: "User List for Managing Provider's Api",
          columnDetails: [
            { name: 'id', title: 'Relation Id' },
            { name: 'userId', title: 'User Id' },
            { name: 'username', title: 'User Name' },
          ],
        },
      ],
      actions,
    };
    const userName = getUserName();
    const userId = getUserId();
    columnSchemas.userName = userName;
    columnSchemas.userId = userId;
    this.setState({ columnSchemas });
  }

  handleUser = () => {
    const { selectedRow } = this.state;
    console.log('112213', selectedRow);
    if (selectedRow && selectedRow.orgType !== '2') {
      // message.success(selectedRow.username);
      this.setState({
        modalVisible: true,
      });
    } else {
      message.error('消费方无法选择用户！');
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
    const { modalVisible, selectedRow, columnSchemas } = this.state;
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
            <a onClick={() => this.handleUser()} title="Set Data Access Permission">
              Access
            </a>
          </QueryCommand>
        </BindDataQueryTable>
        <UserTransfer
          title="授权"
          modalVisible={modalVisible}
          onVisible={this.handleVisible}
          columnSchemas={columnSchemas}
          selectedRow={selectedRow}
          onRefreshData={this.handleRefreshData}
          keyName="userId"
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
