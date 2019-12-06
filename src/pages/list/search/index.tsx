import React, { Component } from 'react';

import { Input } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import router from 'umi/router';

interface SearchProps {
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
}

@connect()
class Search extends Component<SearchProps> {
  handleTabChange = (key: string) => {
    const { match } = this.props;
    const url = match.url === '/' ? '' : match.url;
    switch (key) {
      case 'articles':
        router.push(`${url}/articles`);
        break;
      case 'applications':
        router.push(`${url}/applications`);
        break;
      case 'projects':
        router.push(`${url}/projects`);
        break;
      default:
        break;
    }
  };

  handleFormSubmit = (value: string) => {
    console.log(value);
  };

  getTabKey = () => {
    const { match, location } = this.props;
    const url = match.path === '/' ? '' : match.path;
    const tabKey = location.pathname.replace(`${url}/`, '');
    if (tabKey && tabKey !== '/') {
      return tabKey;
    }
    return 'articles';
  };

  render() {
    const tabList = [
      {
        key: 'articles',
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
          style={{ maxWidth: 522, width: '100%' }}
        />
      </div>
    );

    const { children } = this.props;

    return (
      <PageHeaderWrapper
        content={mainSearch}
        tabList={tabList}
        tabActiveKey={this.getTabKey()}
        onTabChange={this.handleTabChange}
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default Search;
