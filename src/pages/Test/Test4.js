/* 多个model的测试 */
import React, {PureComponent} from 'react';
// 引入面包屑导航组件
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {Button} from 'antd';
import {extend as requestExtend} from 'umi-request';


/**
 * 配置request请求时的默认参数
 */
const request = requestExtend({
  // credentials: 'include', // 默认请求是否带上cookie
});

class TableList extends PureComponent {


  // handleRequest = () => {
  //   console.log("start request");
  //   request('http://jsonplaceholder.typicode.com/posts').then(res => {
  //   // request('/server/serviceAgent/rest/baseInfo/sys/allEnumList').then(res => {
  //     console.log(res);
  //   }).catch(err => {
  //     console.log(err);
  //   });
  // }

  handleRequest = () => {
    console.log("start request");
    request('/server/serviceAgent/rest/baseInfo/sys/allEnumList',
      {method: 'get', getResponse: true, headers: {'AppKey': '10000000017', 'testHeadder1': 'test'}})
      .then(({data, response}) => {
        console.log(data, response, response.headers);
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
