import React from 'react';
import { FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import PageHeader from '@/components/PageHeader';
import GridContent from './GridContent';
import styles from './PageHeaderLayout.less';
import MenuContext from './MenuContext';

const PageHeaderLayout = ({ children, wrapperClassName, top, ...restProps }) => (
  <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
    {top}
    <MenuContext.Consumer>
      {value => {
        return (
          <PageHeader
            home={<FormattedMessage id="menu.home" defaultMessage="Home" />}
            {...value}
            key="pageheader"
            {...restProps}
            linkElement={Link}
            itemRender={item => {
              if (item.locale) {
                return <FormattedMessage id={item.locale} defaultMessage={item.name} />;
              }
              return item.name;
            }}
          />
        );
      }}
    </MenuContext.Consumer>
    {children ? (
      <div className={styles.content}>
        <GridContent>{children}</GridContent>
      </div>
    ) : null}
  </div>
);

export default PageHeaderLayout;
