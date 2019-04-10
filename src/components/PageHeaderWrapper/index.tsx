import { MenuDataItem } from '@ant-design/pro-layout';
import ConnectState from '@/models/connect';
import { PageHeader, Tabs, Typography } from 'antd';
import classNames from 'classnames';
import { ContentWidth } from 'config/defaultSettings';
import { connect } from 'dva';
import React from 'react';
import { RouterTypes } from 'umi';
import { formatMessage } from 'umi-plugin-react/locale';
import { conversionBreadcrumbList } from './Breadcrumb';
import GridContent from './GridContent';
import styles from './index.less';

const { Title } = Typography;

/**
 * render Footer tabList
 * In order to be compatible with the old version of the PageHeader
 * basically all the functions are implemented.
 */
const renderFooter = ({
  tabList,
  onTabChange,
  tabBarExtraContent,
}: Partial<PageHeaderWrapperProps>) => {
  return tabList && tabList.length ? (
    <Tabs
      className={styles.tabs}
      onChange={key => {
        if (onTabChange) {
          onTabChange(key);
        }
      }}
      tabBarExtraContent={tabBarExtraContent}
    >
      {tabList.map(item => (
        <Tabs.TabPane tab={item.tab} key={item.key} />
      ))}
    </Tabs>
  ) : null;
};

export interface PageHeaderWrapperProps {
  action?: React.ReactNode | string;
  breadcrumbList?: Array<{ title: string; href: string }>;
  breadcrumbNameMap?: { [path: string]: MenuDataItem };
  children?: React.ReactNode;
  className?: string;
  content?: React.ReactNode;
  contentWidth?: ContentWidth;
  extraContent?: React.ReactNode;
  home?: React.ReactNode;
  location?: RouterTypes['location'];
  logo?: React.ReactNode | string;
  onTabChange?: (key: string) => void;
  style?: React.CSSProperties;
  tabActiveKey?: string;
  tabBarExtraContent?: React.ReactNode;
  tabList?: Array<{ key: string; tab: React.ReactNode }>;
  title?: React.ReactNode | string | number;
  top?: React.ReactNode;
  wide?: boolean;
  wrapperClassName?: string;
}

class PageHeaderWrapper extends React.Component<PageHeaderWrapperProps> {
  mergePropsAndChildren = (): PageHeaderWrapperProps => {
    return {
      ...this.props,
    };
  };
  renderPageHeader = () => {
    const {
      children,
      contentWidth,
      wrapperClassName,
      top,
      title,
      content,
      logo,
      extraContent,
      ...restProps
    } = this.mergePropsAndChildren();
    let pageTitle = title;
    const breadcrumb = conversionBreadcrumbList({
      ...restProps,
      home: formatMessage({
        id: 'menu.home',
        defaultMessage: 'Home',
      }),
    });
    if (!title && breadcrumb.routes) {
      const router = breadcrumb.routes[breadcrumb.routes.length - 1];
      if (router) {
        pageTitle = router.breadcrumbName;
      }
    }
    if (!pageTitle && !content) {
      return;
    }
    return (
      <PageHeader
        title={
          <Title
            level={4}
            style={{
              marginBottom: 0,
            }}
          >
            {pageTitle}
          </Title>
        }
        {...restProps}
        breadcrumb={breadcrumb}
        className={styles.pageHeader}
        footer={renderFooter(restProps)}
      >
        <div className={styles.detail}>
          {logo && <div className={styles.logo}>{logo}</div>}
          <div className={styles.main}>
            <div className={styles.row}>
              {content && <div className={styles.content}>{content}</div>}
              {extraContent && <div className={styles.extraContent}>{extraContent}</div>}
            </div>
          </div>
        </div>
      </PageHeader>
    );
  };
  render() {
    const { children } = this.mergePropsAndChildren();
    return (
      <div style={{ margin: '-24px -24px 0' }} className={classNames(classNames, styles.main)}>
        {children ? (
          <div className={styles['children-content']}>
            <GridContent>{children}</GridContent>
          </div>
        ) : null}
      </div>
    );
  }
}

export default connect(({ setting }: ConnectState) => ({
  contentWidth: setting.contentWidth,
}))(PageHeaderWrapper);
