import React from 'react';
import PageHeader from '../components/PageHeader';

export default ({ children, ...restProps }) => (
  <div style={{ margin: -24 }}>
    <PageHeader {...restProps} />
    {children ? <div style={{ margin: 24 }}>{children}</div> : null}
  </div>
);
