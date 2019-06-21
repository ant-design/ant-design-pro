/* 多个model的测试 */
import React, {PureComponent} from 'react';
// import {connect} from 'dva';
// 引入面包屑导航组件
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {Button,Input} from 'antd';
import {extend as requestExtend} from 'umi-request';

/**
 * 配置request请求时的默认参数
 */
const request = requestExtend({
  // credentials: 'include', // 默认请求是否带上cookie
});

// @connect(({groupModel, orgModel, loading}) => ({
//   groupList: groupModel.groupList,
//   orgList: orgModel.orgList,
//   loading: loading.effects['apiCreateModel/apiInfo'],
// }))
class Test4 extends PureComponent {


  constructor(props) {
    super(props);
    // console.log("props:", props);
    this.state = {
      // groupList: [],
      // orgList: [],
      // loading: false,
      responseHeader:undefined,
      responseBody:undefined,
      responseStatus:undefined,
      responseStatusText:undefined,
      url:'/server/serviceAgent/rest/baseInfo/sys/allEnumList'
    };
  }

  // static getDerivedStateFromProps(nextProps, preState) {
    // const {groupList, orgList} = nextProps;
    // console.log("----$$$", groupList, orgList, preState)
    // if (orgList && orgList.length > 0 && preState.orgList.length === 0) {
    //   console.log("@@@@@1")
    //   return {orgList, loading: false};
    // }
    // if (groupList && groupList.length > 0 && preState.groupList.length === 0) {
    //   console.log("@@@@@2")
    //   return {groupList};
    // }
    // return null;
  // }

  componentDidMount() {

    // const {dispatch} = this.props;

    // 分组列表
    // dispatch({
    //   type: 'groupModel/allGroupList',
    // });
    // dispatch({
    //   type: 'orgModel/allOrgList',
    //   payload: {orgType: '0,1'},
    // });
    // this.setState({loading: true});
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
  handleUrl = (e) =>{

    console.log(e.target.value)
    this.setState({url:e.target.value})
  }

  handleRequest = () => {
    console.log("start request");

    const {url} = this.state;
    request(url,
      {method: 'get', getResponse: true, headers: {'AppKey': '10000000017', 'testHeadder1': 'test'}})
      // .then(response => {
      //   console.log(response);
      // })
      .then(({data, response}) => {
        console.log(data, response.headers,response.status,response.statusText);
        this.setState({responseHeader:response.headers,responseBody:data,responseStatus:response.status,responseStatusText:response.statusText});

    }).catch(err=>{
      console.log("err:",err);
      if (err.response){
        this.setState({responseHeader:err.response.headers,responseStatus:err.response.status,responseStatusText:err.response.statusText});
      }
      else {
        this.setState({responseStatus:'500',responseStatusText:err});
      }
      if (err.data){
        this.setState({responseBody:err.data});
      }
    });
  }

  render() {
    // const {orgList, groupList, loading} = this.state;
    // console.log("--render---", orgList, groupList, loading)
    const {responseHeader, responseBody, responseStatus, responseStatusText,url} = this.state;
    console.log(responseHeader);
    const headerArray = [];
    if (responseHeader) {

      responseHeader.forEach((value, key) => {
        headerArray.push(`${key}=${value}`);
      });
    }
    const headerStr=headerArray.join("$$$$$$$$$");
    return (

      <PageHeaderWrapper>
        <div>This is a Test Table Page</div>
        <Input value={url} onChange={this.handleUrl} />
        <Button onClick={this.handleRequest}>call</Button>
        <div>responseStatus:{responseStatus}</div>
        <div>responseStatusText:{responseStatusText}</div>
        <div>responseHeader:{headerStr}</div>
        <div>responseBody:{responseBody?JSON.stringify(responseBody):''}</div>
      </PageHeaderWrapper>
    );
  }
}

export default Test4;
