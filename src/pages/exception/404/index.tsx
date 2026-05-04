import { Link, useIntl } from '@umijs/max';
import { Button, Card, Result } from 'antd';
import React from 'react';

const Exception404: React.FC = () => {
  const intl = useIntl();
  return (
    <Card variant="borderless">
      <Result
        status="404"
        title="404"
        subTitle={intl.formatMessage({ id: 'pages.404.subTitle' })}
        extra={
          <Link to="/" prefetch>
            <Button type="primary">
              {intl.formatMessage({ id: 'pages.404.buttonText' })}
            </Button>
          </Link>
        }
      />
    </Card>
  );
};

export default Exception404;
