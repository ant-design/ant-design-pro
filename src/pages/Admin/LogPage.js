// react页面必须引入的组件
import React from 'react';
// 引入面包屑导航组件
import ReactJson from 'react-json-view'
import {Input} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import {getLogInfo,firstLog,secondLog} from '@/utils/log';

const {TextArea} = Input;

const token=localStorage.getItem("token");
// console.log("====1",`Bearer ${token}`);
const logArray=getLogInfo();
export default () => (
  <PageHeaderWrapper>
    <div>
      Token:<TextArea rows={3} value={`Bearer ${token}`} />
      <br />
      log:<ReactJson src={logArray} collapsed='true' />
      <br />
      first log:<ReactJson src={firstLog()} />
      <br />
      second log:<ReactJson src={secondLog()} />
    </div>
  </PageHeaderWrapper>
);
