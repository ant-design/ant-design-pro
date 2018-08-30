import React from 'react';
import ExtPage from 'components/ExtPage';
import PageHeaderLayout from 'core/layouts/PageHeaderLayout';
import { url } from 'core/common/AppInfo';

const Druid = () => (
  <PageHeaderLayout title="Druid执行监控">
    <ExtPage url={`${url}/druid/index.html`} height="640" />
  </PageHeaderLayout>
  );
export default Druid;
