import Exception from '@/components/Exception';
import React from 'react';
import { formatMessage } from 'umi-plugin-locale';
import Link from 'umi/link';

const Exception404: React.FunctionComponent = () => (
  <Exception
    type="404"
    linkElement={Link}
    desc={formatMessage({ id: 'app.exception.description.404' })}
    backText={formatMessage({ id: 'app.exception.back' })}
  />
);

export default Exception404;
