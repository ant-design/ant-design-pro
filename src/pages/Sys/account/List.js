import React, { PureComponent } from 'react';
import { Table, Alert, Divider, Badge, notification, message } from 'antd';
import { connect } from 'dva';
import styles from './List.less';
import { getValue } from '@/utils/utils';
// 部门管理列表
@connect(({ loading }) => ({
  loading: loading.models.account,
}))
export default class List extends PureComponent {
  // 清除选择
  cleanSelectedKeys = () => {
    this.handleSelectRows([]);
  };

  // 行选事件
  handleSelectRows = rows => {
    const { dispatch } = this.props;
    dispatch({
      type: 'account/updateState',
      payload: { selectedRowKeys: rows },
    });
  };

  // 编辑
  handleEditClick = record => {
    if (record.id) {
      this.props.dispatch({
        type: 'account/edit',
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
      type: 'account/remove',
      payload: {
        param: [record.id],
      },
      callback: () => {
        message.success('操作成功.');
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
      type: 'account/fetch',
      payload: params,
    });
  };

  render() {
    const { list, pagination, selectedRowKeys, loading } = this.props;
    const statusMap = { true: 'error', false: 'success' };
    const status = { true: '已锁定', false: '正常' };

    const columns = [
      {
        render: (t, r, i) => i,
      },
      {
        title: '编码',
        dataIndex: 'code',
        sorter: true,
      },
      {
        title: '姓名',
        dataIndex: 'name',
        sorter: true,
      },
      {
        title: '帐号',
        dataIndex: 'account',
        render: val => <div style={{ textAlign: 'center' }}>{val}</div>,
      },
      {
        title: '手机',
        dataIndex: 'tel',
        render: val => <div style={{ textAlign: 'center' }}>{val}</div>,
      },
      {
        title: '性别',
        dataIndex: 'spec',
      },
      {
        title: '状态',
        dataIndex: 'locked',
        sorter: true,
        render: text => <Badge status={statusMap[text]} text={status[text]} />,
      },
      {
        title: '最后登录时间',
        dataIndex: 'lastlogin',
        sorter: true,
      },
      {
        title: '最后登录IP',
        dataIndex: 'lastip',
        sorter: true,
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

    const paginationProps = {
      ...pagination,
    };

    const rowSelectionProps = {
      selectedRowKeys,
      onChange: selectedKeys => {
        this.handleSelectRows(selectedKeys);
      },
    };
    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          <Alert
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
        </div>
        <Table
          loading={loading}
          bordered
          dataSource={list}
          rowKey={record => record.id}
          rowSelection={rowSelectionProps}
          rowClassName={record => record.locked ? styles.disabled : styles.enabled}
          pagination={paginationProps}
          columns={columns}
          onSelectRow={this.handleSelectRows}
          onChange={this.handleListChange}
        />
      </div>
    );
  }
}
