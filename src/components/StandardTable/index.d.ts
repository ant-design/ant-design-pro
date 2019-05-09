import { PaginationConfig, SorterResult, TableCurrentDataSource } from 'antd/lib/table';
import React from 'react';

export interface IStandardTableProps {
  columns: any;
  onSelectRow: (row: any) => void;
  data: any;
  rowKey?: string;
  selectedRows: any[];
  onChange?: (
    pagination: PaginationConfig,
    filters: Record<keyof any, string[]>,
    sorter: SorterResult<any>,
    extra?: TableCurrentDataSource<any>
  ) => void;
  loading?: boolean;
}

export default class StandardTable extends React.Component<IStandardTableProps, any> {}
