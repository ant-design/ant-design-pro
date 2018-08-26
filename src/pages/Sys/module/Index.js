import React from 'react';
import Page from '@/components/Page';
import { connect } from 'dva';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';
import ModuleList from './ModuleList';
import ModuleDetail from './ModuleDetail';

@connect(state => ({
  module: state.module,
}))
export default class Module extends React.PureComponent {
  // 组件加载完成后加载数据
  render() {
    const { dispatch } = this.props;
    const { data, selectedRowKeys, modalType, currentItem } = this.props.module;

    const tableProps = {
      dispatch,
      selectedRowKeys,
      data,
    };

    const modalProps = {
      data,
      dispatch,
      currentItem,
      modalType,
    };

    return (
      <PageHeaderLayout title="模块管理">
        <Page>
          <ModuleList {...tableProps} />
          {'' !== modalType && <ModuleDetail {...modalProps} />}
        </Page>
      </PageHeaderLayout>
    );
  }
}
