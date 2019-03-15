/* 简单model测试 */
// react页面必须引入的组件
import React, { PureComponent } from 'react';
// 引入面包屑导航组件
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Table } from 'antd';
import { connect } from 'dva';

const columns = [
  {
    title: 'userId',
    dataIndex: 'userId',
  },
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: 'title',
    dataIndex: 'title',
  },
];

/* eslint react/no-multi-comp:0 */
@connect(({ testModel, loading }) => ({
  testModel,
  loading: loading.models.testModel,
}))
class TableList extends PureComponent {
  state = {
    data: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    // fetchEnumData(this, constants.API_STATE_KEY);
    console.log('state1:', this.state);
    dispatch({
      type: 'testModel/fetch',
    });
  }

  render() {
    const {
      loading,
      testModel: { data },
    } = this.props;
    console.log(this.props);
    console.log(this.state);
    // const { data } = this.state;
    //
    // console.log('state2:', this.state);

    return (
      <PageHeaderWrapper>
        <div>This is Test Table Page</div>

        <Table rowKey="id" dataSource={data.list} loading={loading} columns={columns} />
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
