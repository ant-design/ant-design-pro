import React from 'react';
import ExtPage from 'components/ExtPage';
import PageHeaderLayout from 'core/layouts/PageHeaderLayout';
import { url } from 'core/common/AppInfo';
const Swagger = () => {
  return (
    <PageHeaderLayout title="Swagger">
      <ExtPage url={`${url}/swagger-ui.html`} height="640" />
    </PageHeaderLayout>
  );
};
export default Swagger;
