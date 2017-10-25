import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Tabs } from 'antd';
import { Link } from 'react-router';
import classNames from 'classnames';
import styles from './index.less';

const { TabPane } = Tabs;

function itemRender(route, params, routes, paths) {
  const last = routes.indexOf(route) === routes.length - 1;
  return (last || !route.component)
    ? <span>{route.breadcrumbName}</span>
    : <Link to={paths.join('/') || '/'}>{route.breadcrumbName}</Link>;
}

export default class PageHeader extends PureComponent {
  static contextTypes = {
    routes: PropTypes.array,
    params: PropTypes.object,
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  };
  onChange = (key) => {
    if (this.props.onTabChange) {
      this.props.onTabChange(key);
    }
  };
  getBreadcrumbProps = () => {
    return {
      routes: this.props.routes || this.context.routes,
      params: this.props.params || this.context.params,
      location: this.props.location || this.context.location,
      breadcrumbNameMap: this.props.breadcrumbNameMap || this.context.breadcrumbNameMap,
    };
  };
  render() {
    const { routes, params, location, breadcrumbNameMap } = this.getBreadcrumbProps();
    const { title, logo, action, content, extraContent,
      breadcrumbList, tabList, className } = this.props;
    const clsString = classNames(styles.pageHeader, className);
    let breadcrumb;
    if (routes && params) {
      breadcrumb = (
        <Breadcrumb
          className={styles.breadcrumb}
          routes={routes.filter(route => route.breadcrumbName)}
          params={params}
          itemRender={itemRender}
        />
      );
    } else if (location && location.pathname) {
      const pathSnippets = location.pathname.split('/').filter(i => i);
      const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
          <Breadcrumb.Item key={url}>
            <Link to={url}>
              {breadcrumbNameMap[url] || breadcrumbNameMap[url.replace('/', '')] || url}
            </Link>
          </Breadcrumb.Item>
        );
      });
      const breadcrumbItems = [(
        <Breadcrumb.Item key="home">
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
      )].concat(extraBreadcrumbItems);
      breadcrumb = (
        <Breadcrumb className={styles.breadcrumb}>
          {breadcrumbItems}
        </Breadcrumb>
      );
    } else if (breadcrumbList && breadcrumbList.length) {
      breadcrumb = (
        <Breadcrumb className={styles.breadcrumb}>
          {
            breadcrumbList.map(item => (
              <Breadcrumb.Item key={item.title}>
                {item.href ? <a href="">{item.title}</a> : item.title}
              </Breadcrumb.Item>)
            )
          }
        </Breadcrumb>
      );
    } else {
      breadcrumb = null;
    }

    const tabDefaultValue = tabList && tabList.filter(item => item.default)[0];

    return (
      <div className={clsString}>
        {breadcrumb}
        <div className={styles.detail}>
          {logo && <div className={styles.logo}>{logo}</div>}
          <div className={styles.main}>
            <div className={styles.row}>
              {title && <h1 className={styles.title}>{title}</h1>}
              {action && <div className={styles.action}>{action}</div>}
            </div>
            <div className={styles.row}>
              {content && <div className={styles.content}>{content}</div>}
              {extraContent && <div className={styles.extraContent}>{extraContent}</div>}
            </div>
          </div>
        </div>
        {
          tabList &&
          tabList.length &&
          <Tabs
            className={styles.tabs}
            defaultActiveKey={(tabDefaultValue && tabDefaultValue.key)}
            onChange={this.onChange}
          >
            {
              tabList.map(item => <TabPane tab={item.tab} key={item.key} />)
            }
          </Tabs>
        }
      </div>
    );
  }
}
