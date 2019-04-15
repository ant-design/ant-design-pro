// react页面必须引入的组件
import React from 'react';
// 引入面包屑导航组件
import ReactJson from 'react-json-view'
import {Input} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {getRouteDatas,toSimulatePrivilege,toInsertSql,flatToMenuTree} from '../UserManager/userUtil';
import routeDatas from "../../../config/router.api.config";

const routes=getRouteDatas(routeDatas);
const privileges=[];
const flatPrivileges=[];
const menuDatas=[];
toSimulatePrivilege(privileges,routes,false,false);
toSimulatePrivilege(flatPrivileges,routes,true,true);
flatToMenuTree(flatPrivileges,menuDatas,0);
const sqlArray=toInsertSql(flatPrivileges);
const sqlStr=sqlArray.join("\n");
const {TextArea} = Input;

export default () => (
  <PageHeaderWrapper>
    <div>
      ant框架的原始菜单数据:<ReactJson src={routes} collapsed='true' />
      <br />
      转换为树形表格格式:<ReactJson src={privileges} collapsed='true' />
      <br />
      转换为后台返回的模拟数据:<ReactJson src={flatPrivileges} collapsed='true' />
      <br />
      转换为Insert Sql:<TextArea rows={20} value={sqlStr} />
      转换为ant菜单数据:<ReactJson src={menuDatas} collapsed='true' />
      <br />
    </div>
  </PageHeaderWrapper>
);
