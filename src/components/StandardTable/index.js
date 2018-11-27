import React, { PureComponent } from 'react';
import { Table } from 'antd';
// import PropTypes from 'prop-types';
import styles from './index.less';

function initTotalList(columns) {
  const totalList = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

class StandardTable extends PureComponent {
  constructor(props) {
    super(props);
    const { columns } = props;
    const needTotalList = initTotalList(columns);
    this.state = {
      selectedRowKeys: [],
      needTotalList,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      const needTotalList = initTotalList(nextProps.columns);
      return {
        selectedRowKeys: [],
        needTotalList,
      };
    }
    return null;
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    // selectedRows获取选中的行信息
    let { needTotalList } = this.state;
    needTotalList = needTotalList.map(item => ({
      ...item,
      total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex], 10), 0),
    }));
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys, needTotalList });
  };

  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };

  // 点击行选中
  selectRow = (flag, record) => {
    const { selectedRowKeys } = this.state;
    const selectedRowKey = [...selectedRowKeys];
    // 单击删除一直处于选中状态
    if (flag) {
      if (selectedRowKey.indexOf(record.id) >= 0) {
        selectedRowKey.splice(selectedRowKey.indexOf(record.id), 1);
        selectedRowKey.push(record.id);
      } else {
        selectedRowKey.push(record.id);
      }
    }
    // 单击某一行处于选中状态，再次单击取消
    if (!flag) {
      if (selectedRowKey.indexOf(record.id) >= 0) {
        selectedRowKey.splice(selectedRowKey.indexOf(record.id), 1);
      } else {
        selectedRowKey.push(record.id);
      }
    }
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRowKey);
    }
    this.setState({ selectedRowKeys: selectedRowKey });
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  render() {
    const { selectedRowKeys } = this.state;
    const {
      data: { list, pagination },
      loading,
      columns,
      rowKey,
    } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      onClick: this.handleRowSelectChange,
    };

    return (
      <div className={styles.standardTable}>
        <Table
          scroll={{ x: 1100 }}
          loading={loading}
          rowKey={rowKey || 'id'}
          rowSelection={rowSelection}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          onRow={record => ({
            onClick: () => {
              const flag = false;
              this.selectRow(flag, record);
            },
          })}
        />
      </div>
    );
  }
}
StandardTable.propTypes = {};
export default StandardTable;
