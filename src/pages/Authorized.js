import React from 'react';
import Authorized from '@/utils/Authorized';
import Exception from '@/components/Exception';
import { formatMessage } from 'umi/locale';
import Link from 'umi/link';
import Redirect from 'umi/redirect';

export default ({ children }) => {
  let noMatch = (
    <Exception
      type="403"
      desc={formatMessage({ id: 'app.exception.description.403' })}
      linkElement={Link}
      backText={formatMessage({ id: 'app.exception.back' })}
    />
  );
  // if Authority === ['guest'] redirect to /user/login
  // You can implement the logic here.
  if (Authorized.getCurrentAuthority().join('') === 'guest') {
    noMatch = <Redirect to="/user/login" />;
  }
  return (
    <Authorized authority={children.props.route.authority} noMatch={noMatch}>
      {children}
    </Authorized>
  );
};
