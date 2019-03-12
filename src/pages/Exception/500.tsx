import Exception from '@/components/Exception';
import React from 'react';
import { formatMessage } from 'umi-plugin-locale';
import Link from 'umi/link';

const Exception500: React.FunctionComponent = () => (
  <Exception
    type="500"
    desc={formatMessage({ id: 'app.exception.description.500' })}
    linkElement={Link}
    backText={formatMessage({ id: 'app.exception.back' })}
  />
);

export default Exception500;
