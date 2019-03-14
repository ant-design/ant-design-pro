import { Skeleton, Tabs } from 'antd';
import classNames from 'classnames';
import React from 'react';
import BreadcrumbView from './breadcrumb';
import styles from './index.less';

const { TabPane } = Tabs;

export interface PageHeaderProps {
  title?: string | number;
  logo?: React.ReactNode | string;
  action?: React.ReactNode | string;
  content?: React.ReactNode;
  extraContent?: React.ReactNode;
  routes?: any[];
  params?: any;
  breadcrumbList?: Array<{ title: string | number; href?: string }>;
  tabList?: Array<{ key: string; tab: React.ReactNode }>;
  tabActiveKey?: string;
  tabDefaultActiveKey?: string;
  onTabChange?: (key: string) => void;
  tabBarExtraContent?: React.ReactNode;
  linkElement?: React.ReactNode | string;
  style?: React.CSSProperties;
  home?: React.ReactNode;
  wide?: boolean;
  hiddenBreadcrumb?: boolean;
  itemRender?: (item: any) => string;
  className?: string;
  loading?: boolean;
  location?: Location;
  breadcrumbNameMap?: object;
  breadcrumbSeparator?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = props => {
  const {
    title = '',
    logo,
    action,
    content,
    extraContent,
    tabList,
    className,
    tabActiveKey,
    tabDefaultActiveKey,
    tabBarExtraContent,
    loading = false,
    wide = false,
    hiddenBreadcrumb = false,
  } = props;
  const onChange = key => {
    const { onTabChange } = this.props;
    if (onTabChange) {
      onTabChange(key);
    }
  };
  const clsString = classNames(styles.pageHeader, className);
  const activeKeyProps: any = {};
  if (tabDefaultActiveKey !== undefined) {
    activeKeyProps.defaultActiveKey = tabDefaultActiveKey;
  }
  if (tabActiveKey !== undefined) {
    activeKeyProps.activeKey = tabActiveKey;
  }
  return (
    <div className={clsString}>
      <div className={wide ? styles.wide : ''}>
        <Skeleton
          loading={loading}
          title={false}
          active
          paragraph={{ rows: 3 }}
          avatar={{ size: 'large', shape: 'circle' }}
        >
          {hiddenBreadcrumb ? null : <BreadcrumbView {...this.props} />}
          <div className={styles.detail}>
            {logo && <div className={styles.logo}>{logo}</div>}
            <div className={styles.main}>
              <div className={styles.row}>
                <h1 className={styles.title}>{title}</h1>
                {action && <div className={styles.action}>{action}</div>}
              </div>
              <div className={styles.row}>
                {content && <div className={styles.content}>{content}</div>}
                {extraContent && <div className={styles.extraContent}>{extraContent}</div>}
              </div>
            </div>
          </div>
          {tabList && tabList.length ? (
            <Tabs
              className={styles.tabs}
              {...activeKeyProps}
              onChange={onChange}
              tabBarExtraContent={tabBarExtraContent}
            >
              {tabList.map(item => (
                <TabPane tab={item.tab} key={item.key} />
              ))}
            </Tabs>
          ) : null}
        </Skeleton>
      </div>
    </div>
  );
};

export default PageHeader;
