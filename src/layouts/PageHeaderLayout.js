import React from 'react';
import { Link } from 'dva/router';
import PageHeader from '../components/PageHeader';

export default ({ children, wrapperClassName, top, ...restProps }) => (
  <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
    {top}
    <PageHeader {...restProps} linkElement={Link} />
    {children ? <div style={{ margin: '24px 24px 0' }}>{children}</div> : null}
  </div>
);
