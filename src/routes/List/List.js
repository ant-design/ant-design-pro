import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { routerRedux, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import { Input } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect()
export default class SearchList extends Component {
  static contextTypes = {
    routeData: PropTypes.array,
  };

  handleTabChange = (key) => {
    const { dispatch, match } = this.props;
    switch (key) {
      case 'articles':
        dispatch(routerRedux.push(`${match.url}/articles`));
        break;
      case 'applications':
        dispatch(routerRedux.push(`${match.url}/applications`));
        break;
      case 'projects':
        dispatch(routerRedux.push(`${match.url}/projects`));
        break;
      default:
        break;
    }
  }

  render() {
    const tabList = [{
      key: 'articles',
      tab: '文章',
    }, {
      key: 'applications',
      tab: '应用',
    }, {
      key: 'projects',
      tab: '项目',
    }];

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

    const { match } = this.props;
    const { routeData } = this.context;
    const routes = routeData.filter(item => item.path === match.path)[0].children;

    return (
      <PageHeaderLayout
        title="搜索列表"
        content={mainSearch}
        tabList={tabList}
        onTabChange={this.handleTabChange}
      >
        <Switch>
          {
            routes.map(item =>
              (
                <Route
                  key={item.path}
                  path={`${match.path}/${item.path}`}
                  component={item.component}
                />
              )
            )
          }
        </Switch>
      </PageHeaderLayout>
    );
  }
}
