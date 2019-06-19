/* 简单model测试 */
// react页面必须引入的组件
import React, { PureComponent } from 'react';
// 引入面包屑导航组件
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Authorized from '@/utils/Authorized';
import { Alert } from 'antd';
import { getAuth } from '@/utils/authority';

const noMatch = <Alert message="No permission." type="error" showIcon />;

const auth=getAuth("apiGateway1");
console.log("auth=====:",auth);// 1

class Test2 extends PureComponent {

  render() {

    console.log("a=---------------");
    console.log("ddddabc:",localStorage.getItem("antd-pro-authority"));
    return (
      <PageHeaderWrapper>
        <Authorized authority={auth} noMatch={noMatch}>
          {console.log("ddddddfiweieur29393990439 49390")}
        </Authorized>
      </PageHeaderWrapper>
    );
  }
}

export default Test2;
