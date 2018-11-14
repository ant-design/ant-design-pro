import React from 'react';
import Page from '@/components/Page';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import List from './List';
import AOEForm from './AOEForm';

@connect(state => ({
  category: state.category,
}))
export default class Category extends React.PureComponent {

  render() {
    const { dispatch } = this.props;

    const { data, selectedRowKeys, modalType, currentItem } = this.props.category;

    const listProps = {
      dispatch,
      selectedRowKeys,
      data,
    };

    const aoeProps = {
      data,
      dispatch,
      currentItem,
      modalType,
    };

    return (
      <PageHeaderWrapper title="模块管理">
        <Page>
          <List {...listProps} />
          {modalType !== '' && <AOEForm {...aoeProps} />}
        </Page>
      </PageHeaderWrapper>
    )
  }
}


