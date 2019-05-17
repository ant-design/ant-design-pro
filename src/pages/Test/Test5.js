// react页面必须引入的组件
import React from 'react';
// 引入面包屑导航组件
import ReactJson from 'react-json-view'
import {Input} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {getRouteDatas,toSimulatePrivilege,toInsertSql,flatToMenuTree,flatToPrivilegeTreeSelect,getFormatPrivilege} from '../UserManager/userUtil';
import routeDatas from "../../../config/router.api.config";
import {getPrivileges} from '@/utils/authority';
import {getLogInfo} from '@/utils/log';

const routes=getRouteDatas(routeDatas);
const privileges=[];
const flatPrivileges=[];
const menuDatas=[];
const privilegeTreeDataForSelect=[];
toSimulatePrivilege(privileges,routes,false,false);
toSimulatePrivilege(flatPrivileges,routes,true,true);
flatToMenuTree(flatPrivileges,menuDatas,0);
flatToPrivilegeTreeSelect(flatPrivileges,privilegeTreeDataForSelect,0);
const sqlArray=toInsertSql(flatPrivileges);
const sqlStr=sqlArray.join("\n");
const {TextArea} = Input;
const privilegesFromStorage=getPrivileges();
const formatPrivilegeData = getFormatPrivilege(privilegesFromStorage);

const token=localStorage.getItem("token");
// console.log("====1",`Bearer ${token}`);

export default () => (
  <PageHeaderWrapper>
    <div>
      Token:<TextArea rows={3} value={`Bearer ${token}`} />
      <br />
      log:<ReactJson src={getLogInfo()} collapsed='true' />
      <br />
      ant框架的原始菜单数据:<ReactJson src={routes} collapsed='true' />
      <br />
      转换为树形表格格式:<ReactJson src={privileges} collapsed='true' />
      <br />
      转换为树形下拉框格式:<ReactJson src={privilegeTreeDataForSelect} collapsed='true' />
      <br />
      转换为后台返回的模拟数据:<ReactJson src={flatPrivileges} collapsed='true' />
      <br />
      从storage获取的权限数据:<ReactJson src={privilegesFromStorage} collapsed='true' />
      <br />
      用于功能权的格式化的权限数据:<ReactJson src={formatPrivilegeData} collapsed='true' />
      <br />
      转换为Insert Sql:<TextArea rows={20} value={sqlStr} />
      转换为ant菜单数据:<ReactJson src={menuDatas} collapsed='true' />
      <br />
    </div>
  </PageHeaderWrapper>
);
