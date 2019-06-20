// react页面必须引入的组件
import React, {PureComponent} from 'react';
// 引入面包屑导航组件
import ReactJson from 'react-json-view'
import {Input,Button} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import {getLogInfo} from '@/utils/log';

const {TextArea} = Input;
// console.log("====1",`Bearer ${token}`);
const timeout=3000;

class LogPage extends PureComponent {

  state={
    token:"",
    logArray:[],
    secondsElapsed: 0,
    isStop:false,
  }

  componentDidMount() {
    this.tick();
    this.interval = setInterval(() => this.tick(), timeout);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick=() => {
    this.setState({
      token: `Bearer ${localStorage.getItem("token")}`,
      logArray: getLogInfo(),
    });
    this.setState((prevState) => ({
      secondsElapsed: prevState.secondsElapsed + timeout/1000,
    }));
    const {secondsElapsed}= this.state;
    if(secondsElapsed>10){
      this.setState({secondsElapsed:0,isStop:true});
      clearInterval(this.interval);
    }
  }

  actLog=()=>{
    const {isStop}=this.state;
    if(!isStop){
      clearInterval(this.interval);
    }
    else{
      this.interval = setInterval(() => this.tick(), timeout);
    }
    this.setState({secondsElapsed: 0, isStop:!isStop});
  }

  render() {

    const {token,logArray,secondsElapsed,isStop}=this.state;
    return (
      <PageHeaderWrapper>
        <div>
          Seconds Elapsed: {secondsElapsed}
          <span>&nbsp;&nbsp;</span>
          <Button type="primary" onClick={this.actLog}>{!isStop?'停止':'启动'}</Button>
          <br />
          Token:<TextArea rows={3} value={token} />
          <br /><br />
          <ReactJson
            src={logArray}
            name="rest log list for ui"
            // style={{backgroundColor: '#444'}}
            collapsed={2}
            iconStyle='circle'
            theme='monokai'
          />
          <br />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default LogPage;
