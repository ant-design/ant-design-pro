/* 多个model的测试 */
import React, {PureComponent} from 'react';
// 引入面包屑导航组件
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {Button} from 'antd';
import request from '@/utils/request';

class TableList extends PureComponent {

  componentWillMount() {
    console.log('Component WILL MOUNT!');
  }

  componentDidMount() {
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

  handleRequest = () => {
    console.log("start request");
    request('http://jsonplaceholder.typicode.com/posts').then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }

  render() {

    return (
      <PageHeaderWrapper>
        <div>This is a Test Table Page</div>

        <Button onClick={this.handleRequest}>call</Button>
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
