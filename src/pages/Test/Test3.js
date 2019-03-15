/* 主数据测试 */
// react页面必须引入的组件
import React, { PureComponent } from 'react';
// 引入面包屑导航组件
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { setAllEnumData, getItem } from '@/utils/masterData';

setAllEnumData();
// const allEnum=getAllEnumData();
const status = getItem('apiService', 'status', '1');
class EnumTest extends PureComponent {
  // state={
  //   data: [],
  // }

  componentWillMount() {
    console.log('componentWillMount');
    // this.setState({
    //   data: allEnum
    // });
  }

  componentDidMount() {
    console.log('componentDidMount');

    // this.setState({
    //   data: allEnum
    // });
  }

  render() {
    console.log('render');
    return (
      <PageHeaderWrapper>
        <div>
          This is Test Table Page
          <div id="data">获取缓存数据(apiService.statusName):{status.itemValue}</div>
        </div>
      </PageHeaderWrapper>
    );
  }
}
export default EnumTest;
