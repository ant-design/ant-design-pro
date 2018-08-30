import React, { PureComponent } from 'react';
import { Table, Icon, Alert, Divider, Badge, message, notification } from 'antd';
import styles from './Index.less';

export default class RoleGrid extends PureComponent {
  // 初始化加载数据
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'role/listRole',
    });
  }

  // 用户授权按钮
  handleRoleClick = (record, operate) => {
    const { dispatch } = this.props;

    dispatch({
      type: `role/list${operate}`,
      payload: {
        roleId: record.id,
        currentItem: record,
        operateType: operate,
      },
    });
  };

  // 表格动作触发事件
  handleListChange = (pagination, filtersArg, sorter) => {
    const { dispatch, formValues } = this.props;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'role/list',
      payload: params,
    });
  };

  // 清除选择
  cleanSelectedKeys = () => {
    this.handleSelectRows([]);
  };

  // 编辑
  handleEditClick = record => {
    if (record.id) {
      this.props.dispatch({
        type: 'role/edit',
        payload: {
          modalType: 'edit',
          id: record.id,
        },
      });
    } else {
      notification.error('没有选择记录');
    }
  };

  // 单条删除
  handleDeleteClick = record => {
    this.props.dispatch({
      type: 'role/remove',
      payload: {
        param: [record.id],
      },
      callback: () => {
        message.success('操作成功.');
      },
    });
  };

  // 行选事件
  handleSelectRows = rows => {
    const { dispatch } = this.props;
    dispatch({
      type: 'role/updateState',
      payload: { selectedRowKeys: rows },
    });
  };

  render() {
    const { list, pagination, selectedRowKeys, loading } = this.props;
    const paginationProps = {
      ...pagination,
    };
    const rowSelectionProps = {
      selectedRowKeys,
      onChange: selectedKeys => {
        this.handleSelectRows(selectedKeys);
      },
    };
    const statusMap = { true: 'error', false: 'success' };

    const column = [
      {
        title: '角色名称',
        dataIndex: 'name',
        render: (text, record) => <Badge status={statusMap[record.locked]} text={text} />,
      },
      {
        title: '角色编码',
        dataIndex: 'code',
      },
      {
        title: '模块授权',
        render: (text, record) => (
          <div>
            <a onClick={e => this.handleRoleClick(record, 'Module')}>
              <Icon type="bars" />
              模块授权
            </a>
          </div>
        ),
      },
      {
        title: '用户授权',
        render: (text, record) => (
          <div>
            <a onClick={() => this.handleRoleClick(record, 'User')}>
              <Icon type="usergroup-add" />
              用户授权
            </a>
          </div>
        ),
      },
      {
        title: '配置授权',
        render: (text, record) => (
          <div>
            <a onClick={e => this.handleRoleClick(record, 'Config')}>
              <Icon type="setting" />
              配置授权
            </a>
          </div>
        ),
      },
      {
        title: '操作',
        render: (text, record) => (
          <div>
            <a onClick={e => this.handleEditClick(record, e)}>编辑</a>
            <Divider type="vertical" />
            <a onClick={e => this.handleDeleteClick(record, e)}>删除</a>
          </div>
        ),
      },
    ];
    return (
      <div>
        <Alert
          style={{ marginTop: 8, marginBottom: 8 }}
          message={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
              <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
                清空选择
              </a>
            </div>
          }
          type="info"
          showIcon
        />
        <Table
          pagination={paginationProps}
          bordered
          rowSelection={rowSelectionProps}
          rowClassName={record => record.locked ? styles.disabled : styles.enabled}
          onSelectRow={this.handleSelectRows}
          onChange={this.handleListChange}
          dataSource={list}
          columns={column}
          loading={loading}
          rowKey={record => record.id}
        />
      </div>
    );
  }
}
