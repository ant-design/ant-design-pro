import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Input } from 'antd';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';

@connect()
export default class SearchList extends Component {
  handleTabChange = key => {
    const { dispatch, match } = this.props;
    switch (key) {
      case 'Articles':
        dispatch(routerRedux.push(`${match.url}/Articles`));
        break;
      case 'Applications':
        dispatch(routerRedux.push(`${match.url}/Applications`));
        break;
      case 'Projects':
        dispatch(routerRedux.push(`${match.url}/Projects`));
        break;
      default:
        break;
    }
  };

  render() {
    const tabList = [
      {
        key: 'Articles',
        tab: '文章',
      },
      {
        key: 'projects',
        tab: '项目',
      },
      {
        key: 'applications',
        tab: '应用',
      },
    ];

    const mainSearch = (
      <div style={{ textAlign: 'center' }}>
        <Input.Search
          placeholder="请输入"
          enterButton="搜索"
          size="large"
          onSearch={this.handleFormSubmit}
          style={{ width: 522 }}
        />
      </div>
    );

    const { match, children, location } = this.props;

    return (
      <PageHeaderLayout
        title="搜索列表"
        content={mainSearch}
        tabList={tabList}
        tabActiveKey={location.pathname.replace(`${match.path}/`, '')}
        onTabChange={this.handleTabChange}
      >
        {children}
        {/* <Switch>
          {routes.map(item => (
            <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
          ))}
        </Switch> */}
      </PageHeaderLayout>
    );
  }
}
