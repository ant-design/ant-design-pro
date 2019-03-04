import React from 'react';
import Link from 'umi/link';
import { formatMessage } from 'umi-plugin-locale';
import Exception from '@/components/Exception';

const Exception404: React.SFC = () => (
  <Exception
    type="404"
    linkElement={Link}
    desc={formatMessage({ id: 'app.exception.description.404' })}
    backText={formatMessage({ id: 'app.exception.back' })}
  />
);

export default Exception404;
