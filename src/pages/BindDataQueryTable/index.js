/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { message } from 'antd';

import QueryTable from '@/components/QueryTable';

@connect(({ uniComp, loading }) => ({
  uniComp,
  loading: loading.models.uniComp,
}))
class BindDataQueryTable extends PureComponent {
  state = {
    selectedRows: [],
  };

  componentWillMount() {
    console.log('============1componentWillMount========', this.props);
    const {
      uniComp: { data },
    } = this.props;
    if (data && data.list) {
      data.list = [];
    }
  }

  componentDidMount() {
    // console.log('============2componentDidMount========');
    this.handleSearchDefault();
    const { onRef } = this.props;
    if (onRef) {
      onRef(this);
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   const { refreshData } = this.props;
  //   if (nextProps.refreshData&&refreshData !== nextProps.refreshData) {
  //     const {columnSchemas: { tableName, },} = this.props;
  //     this.handleSearch({tableName});
  //   }
  // }

  handleSelectRows = rows => {
    // console.log("----:",rows);
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearchDefault = () => {
    console.log('-------------------222222222');
    const {
      columnSchemas: { tableName },
    } = this.props;
    this.handleSearch({ tableName });
  };

  handleSearch = params => {
    const {
      dispatch,
      onConversionData,
      pageSize,
      columnSchemas: { userName, userId },
    } = this.props;
    const newParams = pageSize
      ? { ...params, userName, userId, pageSize }
      : { ...params, userName, userId };
    console.log('binddata', newParams);
    dispatch({
      type: 'uniComp/list',
      payload: newParams,
      onConversionData,
    });
  };

  handleAdd = (payload, addForm, callback2) => {
    // console.log('handleAdd:',fields);
    const { dispatch } = this.props;

    dispatch({
      type: 'uniComp/save',
      payload,
      callback: resp => {
        // console.log('resp=======', resp);
        if (resp.code === '200') {
          message.success('提交成功');
          callback2(addForm);
        } else {
          message.error('提交失败');
        }
      },
    });
  };

  handleMenuClick = (payload, callback2) => {
    const { dispatch } = this.props;

    // console.log("========uniComp/statusBatch1====");
    dispatch({
      type: 'uniComp/statusBatch',
      payload,
      callback: () => {
        callback2();
      },
    });
  };

  render() {
    const {
      uniComp: { data },
      loading,
      columnSchemas,
      onRow,
      children,
      size,
    } = this.props;
    const { key } = columnSchemas;
    const { selectedRows } = this.state;
    return (
      <QueryTable
        selectedRows={selectedRows}
        rowKey={key}
        loading={loading}
        data={data}
        onSelectRow={this.handleSelectRows}
        onMenuClick={this.handleMenuClick}
        onAdd={this.handleAdd}
        columnSchemas={columnSchemas}
        onSearch={this.handleSearch}
        onRow={onRow}
        size={size}
      >
        {children}
      </QueryTable>
    );
  }
}

export default BindDataQueryTable;
