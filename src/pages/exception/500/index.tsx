import Link from 'umi/link';
import { Result, Button } from 'antd';
import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';

export default () => (
  <Result
    status="500"
    title="500"
    style={{
      background: 'none',
    }}
    subTitle={formatMessage({
      id: 'exceptionand500.description.500',
      defaultMessage: 'Sorry, the server is reporting an error.',
    })}
    extra={
      <Link to="/">
        <Button type="primary">
          {formatMessage({ id: 'exceptionand500.exception.back', defaultMessage: 'Back Home' })}
        </Button>
      </Link>
    }
  />
);
