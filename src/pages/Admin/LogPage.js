// react页面必须引入的组件
import React, {PureComponent} from 'react';
// 引入面包屑导航组件
import ReactJson from 'react-json-view'
import {Input} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import {getLogInfo,getFirstLog,getSecondLog} from '@/utils/log';

const {TextArea} = Input;
// console.log("====1",`Bearer ${token}`);

class LogPage extends PureComponent {

  state={
    token:"",
    logArray:[],
    firstLog:{},
    secondLog:{},
    secondsElapsed: 0
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick=() => {
    this.setState({
      token: `Bearer ${localStorage.getItem("token")}`,
      logArray: getLogInfo(),
      firstLog:getFirstLog(),
      secondLog:getSecondLog(),
    });
    this.setState((prevState) => ({
      secondsElapsed: prevState.secondsElapsed + 2
    }));

  }


  render() {
    const {token,logArray,firstLog,secondLog,secondsElapsed}=this.state;
    return (
      <PageHeaderWrapper>
        <div>
          Seconds Elapsed: {secondsElapsed}<br />
          Token:<TextArea rows={3} value={token} />
          <br />
          log:<ReactJson src={logArray} collapsed='true' />
          <br />
          first log:<ReactJson src={firstLog} />
          <br />
          second log:<ReactJson src={secondLog} />
        </div>
      </PageHeaderWrapper>
    );
  }
}
export default LogPage;
