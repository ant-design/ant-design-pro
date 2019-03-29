import { Alert, Table } from 'antd';
import {
  ColumnProps,
  PaginationConfig,
  SorterResult,
  TableCurrentDataSource,
  TableRowSelection,
} from 'antd/lib/table';
import React, { Component, Fragment } from 'react';
import styles from './index.less';

function initTotalList<T = any>(columns: ColumnProps<T>[]) {
  const totalList: StandardTableColumnProps<T>[] = [];
  columns.forEach((column: any) => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

export interface StandardTableColumnProps<T> extends ColumnProps<T> {
  needTotal?: boolean;
  total?: number;
}

interface StandardTableProps<T = any> {
  columns: StandardTableColumnProps<T>[];
  onSelectRow: (rows: T[]) => void;
  data: any;
  rowKey?: string;
  selectedRows: T[];
  onChange?: (
    pagination: PaginationConfig,
    filters: Record<keyof T, string[]>,
    sorter: SorterResult<T>,
    extra?: TableCurrentDataSource<T>,
  ) => void;
  loading?: boolean;
}

interface StandardTableState<T = any> {
  selectedRowKeys: string[] | number[];
  needTotalList: StandardTableColumnProps<T>[];
}

class StandardTable<T = any> extends Component<StandardTableProps<T>, StandardTableState<T>> {
  static getDerivedStateFromProps(nextProps: StandardTableProps) {
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
  constructor(props: StandardTableProps) {
    super(props);
    const { columns } = props;
    const needTotalList = initTotalList(columns);

    this.state = {
      selectedRowKeys: [],
      needTotalList,
    };
  }

  handleRowSelectChange = (selectedRowKeys: string[] | number[], selectedRows: T[]) => {
    let { needTotalList } = this.state;
    needTotalList = needTotalList.map(item => ({
      ...item,
      total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex!]), 0),
    }));
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys, needTotalList });
  };

  handleTableChange = (
    pagination: PaginationConfig,
    filters: Record<keyof T, string[]>,
    sorter: SorterResult<T>,
    extra: TableCurrentDataSource<T>,
  ) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  render() {
    const { selectedRowKeys, needTotalList } = this.state;
    const { data = {}, rowKey, ...rest } = this.props;
    const { list = [], pagination } = data;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const rowSelection: TableRowSelection<T> = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: (record: T & { disabled?: boolean }) => ({
        disabled: record.disabled,
      }),
    };

    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          <Alert
            message={
              <Fragment>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                {needTotalList.map(item => (
                  <span style={{ marginLeft: 8 }} key={item.dataIndex}>
                    {item.title}
                    总计&nbsp;
                    <span style={{ fontWeight: 600 }}>
                      {item.render ? item.render(item.total, null!, -1) : item.total}
                    </span>
                  </span>
                ))}
                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
                  清空
                </a>
              </Fragment>
            }
            type="info"
            showIcon
          />
        </div>
        <Table<T>
          rowKey={rowKey || 'key'}
          rowSelection={rowSelection}
          dataSource={list}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          {...rest}
        />
      </div>
    );
  }
}

export default StandardTable;
