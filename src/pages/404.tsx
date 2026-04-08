import { Link, useIntl } from '@umijs/max';
import { Button, Card, Result } from 'antd';
import React from 'react';

const NoFoundPage: React.FC = () => (
  <Card variant="borderless">
    <Result
      status="404"
      title="404"
      subTitle={useIntl().formatMessage({ id: 'pages.404.subTitle' })}
      extra={
        <Link to="/" prefetch>
          <Button type="primary">
            {useIntl().formatMessage({ id: 'pages.404.buttonText' })}
          </Button>
        </Link>
      }
    />
  </Card>
);

export default NoFoundPage;
