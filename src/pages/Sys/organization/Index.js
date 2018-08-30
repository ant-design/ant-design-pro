import React, { Component } from 'react';
import { connect } from 'dva';
import OrgList from './OrgList';
import OrgDetail from './OrgDetail';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(state => ({
  organization: state.organization,
}))
export default class organization extends Component {
  // 组件加载完成后加载数据
  render() {
    const { dispatch } = this.props;
    const { data, selectedRowKeys, modalType, currentItem } = this.props.organization;

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
      <PageHeaderWrapper title="组织信息管理">
        <OrgList {...tableProps} />
        {'' !== modalType && <OrgDetail {...modalProps} />}
      </PageHeaderWrapper>
    );
  }
}
