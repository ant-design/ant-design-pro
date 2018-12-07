import React from 'react';
import Link from 'umi/link';
import { formatMessage } from 'umi/locale';
import Exception from 'ant-design-pro/lib/Exception';

export default () => (
  <Exception
    type="404"
    linkElement={Link}
    desc={formatMessage({ id: 'app.exception.description.404' })}
    backText={formatMessage({ id: 'app.exception.back' })}
  />
);
