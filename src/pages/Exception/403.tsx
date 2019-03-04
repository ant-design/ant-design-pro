import Exception from '@/components/Exception';
import React from 'react';
import { formatMessage } from 'umi-plugin-locale';
import Link from 'umi/link';

const Exception403: React.SFC = () => (
  <Exception
    type="403"
    desc={formatMessage({ id: 'app.exception.description.403' })}
    linkElement={Link}
    backText={formatMessage({ id: 'app.exception.back' })}
  />
);

export default Exception403;
