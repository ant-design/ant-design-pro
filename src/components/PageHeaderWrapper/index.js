import React from 'react';
import { FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import { PageHeader, Tabs, Typography } from 'antd';
import { connect } from 'dva';
import classNames from 'classnames';
import GridContent from './GridContent';
import styles from './index.less';
import MenuContext from '@/layouts/MenuContext';
import { conversionBreadcrumbList } from './breadcrumb';

const { Title } = Typography;

/**
 * render Footer tabList
 * In order to be compatible with the old version of the PageHeader
 * basically all the functions are implemented.
 */
const renderFooter = ({ tabList, activeKeyProps, onTabChange, tabBarExtraContent }) => {
  return tabList && tabList.length ? (
    <Tabs
      className={styles.tabs}
      {...activeKeyProps}
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

const PageHeaderWrapper = ({
  children,
  contentWidth,
  wrapperClassName,
  top,
  title,
  content,
  logo,
  extraContent,
  ...restProps
}) => {
  return (
    <div style={{ margin: '-24px -24px 0' }} className={classNames(classNames, styles.main)}>
      {top}
      {title && content && (
        <MenuContext.Consumer>
          {value => {
            return (
              <PageHeader
                wide={contentWidth === 'Fixed'}
                title={
                  <Title
                    level={4}
                    style={{
                      marginBottom: 0,
                    }}
                  >
                    {title}
                  </Title>
                }
                key="pageheader"
                {...restProps}
                breadcrumb={conversionBreadcrumbList({
                  ...value,
                  ...restProps,
                  home: <FormattedMessage id="menu.home" defaultMessage="Home" />,
                })}
                className={styles.pageHeader}
                linkElement={Link}
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
          }}
        </MenuContext.Consumer>
      )}
      {children ? (
        <div className={styles['children-content']}>
          <GridContent>{children}</GridContent>
        </div>
      ) : null}
    </div>
  );
};

export default connect(({ setting }) => ({
  contentWidth: setting.contentWidth,
}))(PageHeaderWrapper);
