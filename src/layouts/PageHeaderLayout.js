import React from 'react';
import { Link } from 'dva/router';
import PageHeader from '../components/PageHeader';
import GridContent from './GridContent';
import styles from './PageHeaderLayout.less';
import MeunContext from './MeunContext';

export default ({ children, wrapperClassName, top, ...restProps }) => (
  <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
    {top}
    <MeunContext.Consumer>
      {value => {
        return <PageHeader {...value} key="pageheader" {...restProps} linkElement={Link} />;
      }}
    </MeunContext.Consumer>
    {children ? (
      <div className={styles.content}>
        <GridContent>{children}</GridContent>
      </div>
    ) : null}
  </div>
);
