// react页面必须引入的组件
import React from 'react';
// 引入面包屑导航组件
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import RadioView from "../ApiGateway/RadioView";
// aaaasssff



// 111111222
export default () => (
  <PageHeaderWrapper>
    <RadioView javaCode="apiService" javaKey="api_type" />
  </PageHeaderWrapper>
);
