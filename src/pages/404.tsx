import { history, useIntl } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';

const NoFoundPage: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle={useIntl().formatMessage({ id: 'pages.404.subTitle' })}
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        {useIntl().formatMessage({ id: 'pages.404.buttonText' })}
      </Button>
    }
  />
);

export default NoFoundPage;
