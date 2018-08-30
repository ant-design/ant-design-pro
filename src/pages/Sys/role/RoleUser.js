import React, { PureComponent } from 'react';
import { Modal, Table } from 'antd';
import styles from './Index.less';
// 授权用户窗口
export default class RoleUser extends PureComponent {
  componentDidMount() {
    console.info('load role user');
  }

  // 保存模块关系
  handleSubmit = () => {
    const { currentItem } = this.props;
    const { checked } = { ...this.props.data };
    let users = [];
    if (checked && checked.length > 0) {
      users = checked.map(item => ({ userId: item }));
    }
    this.props.dispatch({
      type: 'role/saveUser',
      payload: {
        id: currentItem.id,
        users,
      },
    });
  };

  // 保存已选
  handleSelectRows = checkedKeys => {
    const { data } = { ...this.props.data };
    this.props.dispatch({
      type: 'role/updateState',
      payload: {
        userData: {
          data,
          checked: checkedKeys,
        },
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
      type: 'role/listUser',
      payload: params,
    });
  };

  render() {
    const { operateType } = this.props;
    const {
      data: { list, pagination },
      checked,
    } = { ...this.props.data };

    const column = [
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '用户名',
        dataIndex: 'account',
      },
      {
        title: '所属部门',
        dataIndex: 'deptId',
      },
    ];

    const rowSelection = {
      selectedRowKeys: checked,
      onChange: selectedKeys => {
        this.handleSelectRows(selectedKeys);
      },
    };
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };
    return (
      <Modal
        visible={operateType === 'User'}
        title="选择授权用户  "
        okText="保存"
        cancelText="关闭"
        onOk={() => this.handleSubmit()}
        onCancel={() => this.props.handleCancel()}
        width={750}
        bodyStyle={{ maxHeight: 500, overflowY: 'auto', overflowX: 'auto' }}
      >
        {/* 左侧部门树列表 */}
        {/* 右侧列表 */}
        <Table
          dataSource={list}
          columns={column}
          pagination={paginationProps}
          rowKey={record => record.id}
          rowSelection={rowSelection}
          onSelectRow={this.handleSelectRows}
          onChange={this.handleListChange}
        />
      </Modal>
    );
  }
}
