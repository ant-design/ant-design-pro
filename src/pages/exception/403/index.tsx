import Link from 'umi/link';
import { Result, Button } from 'antd';
import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';

export default () => (
  <Result
    status="403"
    title="403"
    style={{
      background: 'none',
    }}
    subTitle={formatMessage({
      id: 'exceptionand403.description.403',
      defaultMessage: "Sorry, you don't have access to this page.",
    })}
    extra={
      <Link to="/">
        <Button type="primary">
          {formatMessage({ id: 'exceptionand403.exception.back', defaultMessage: 'Back Home' })}
        </Button>
      </Link>
    }
  />
);
