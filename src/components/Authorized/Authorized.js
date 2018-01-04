import React from 'react';
import CheckPermissions from './CheckPermissions';
import { getAuthority } from '../../utils/authority';

class Authorized extends React.Component {
  render() {
    const { children, authority, currentAuthority = getAuthority(), noMatch = null } = this.props;
    const childrenRender = typeof children === 'undefined' ? null : children;
    let current = 'NULL';
    if (currentAuthority.constructor.name === 'Function') {
      current = currentAuthority();
    } else if (currentAuthority.constructor.name === 'String') {
      current = currentAuthority;
    }
    return CheckPermissions(
      authority,
      current,
      childrenRender,
      noMatch
    );
  }
}

// for MenuItem, SubMenu and etc. which can not be wrapped by customized component.
// https://github.com/ant-design/ant-design/issues/4853
const authorizedCreate = ({ authority, currentAuthority = getAuthority(), noMatch = null }) => {
  return (Comp) => {
    let current = 'NULL';
    if (currentAuthority.constructor.name === 'Function') {
      current = currentAuthority();
    } else if (currentAuthority.constructor.name === 'String') {
      current = currentAuthority;
    }
    return CheckPermissions(
      authority,
      current,
      Comp,
      noMatch
    );
  };
};

Authorized.create = authorizedCreate;
export default Authorized;
