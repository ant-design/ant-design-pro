/* 多个model的测试 */
import React, {PureComponent} from 'react';
import {connect} from 'dva';
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

@connect(({groupModel, orgModel, loading}) => ({
  groupList: groupModel.groupList,
  orgList: orgModel.orgList,
  loading: loading.effects['apiCreateModel/apiInfo'],
}))
class Test4 extends PureComponent {


  constructor(props) {
    super(props);
    console.log("props:", props);
    this.state = {
      groupList: [],
      orgList: [],
      loading: false,
    };
  }

  static getDerivedStateFromProps(nextProps, preState) {
    const {groupList, orgList} = nextProps;
    console.log("----$$$", groupList, orgList, preState)
    if (orgList && orgList.length > 0 && preState.orgList.length === 0) {
      console.log("@@@@@1")
      return {orgList, loading: false};
    }
    if (groupList && groupList.length > 0 && preState.groupList.length === 0) {
      console.log("@@@@@2")
      return {groupList};
    }
    return null;
  }

  componentDidMount() {

    const {dispatch} = this.props;

    // 分组列表
    dispatch({
      type: 'groupModel/allGroupList',
    });
    dispatch({
      type: 'orgModel/allOrgList',
      payload: {orgType: '0,1'},
    });
    this.setState({loading: true});
  }

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
    const {orgList, groupList, loading} = this.state;
    console.log("--render---", orgList, groupList, loading)
    return (
      <PageHeaderWrapper>
        <div>This is a Test Table Page</div>

        <Button onClick={this.handleRequest}>call</Button>
      </PageHeaderWrapper>
    );
  }
}

export default Test4;
