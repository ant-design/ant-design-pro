/* 多个model的测试 */
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
    dataIndex : 'title',
  },
];

/* eslint react/no-multi-comp:0 */

@connect(({ loading, testModel, project }) => ({
  listLoading: loading.effects['list/fetch'],
  testModelList: testModel.list,
  project,
  testData: testModel.data,
  testLoading: loading.effects['testModel/fetch'],
  projectLoading: loading.effects['project/fetchNotice'],
}))
class TableList extends PureComponent {
  componentWillMount() {
    console.log('Component WILL MOUNT!');
  }

  componentDidMount() {
    console.log('Component DID MOUNT!');
    const { dispatch } = this.props;
    dispatch({
      type: 'testModel/fetch',
    });
    dispatch({
      type: 'project/fetchNotice',
    });
  }

  // componentWillReceiveProps(newProps) {
  //   console.log('Component WILL RECEIVE PROPS!');
  // }
  /*
   * shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.
   */
  // shouldComponentUpdate(newProps, newState) {
  //   return true;
  // }

  // componentWillUpdate(nextProps, nextState) {
  //   console.log('Component WILL UPDATE!');
  // }
  //
  // componentDidUpdate(prevProps, prevState) {
  //   console.log('Component DID UPDATE!');
  // }

  componentWillUnmount() {
    console.log('Component WILL UNMOUNT!');
  }

  render() {
    const { testLoading, testData } = this.props;
    console.log('this.props3:', this.props);
    // const { data } = this.state;
    //
    // console.log('state2:', this.state);

    return (
      <PageHeaderWrapper>
        <div>This is Test Table Page</div>

        <Table rowKey="id" dataSource={testData.list} loading={testLoading} columns={columns} />
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
