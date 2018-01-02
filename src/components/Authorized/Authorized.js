import React from 'react';
import CheckPermissions from './CheckPermissions';
import { getRole } from '../../utils/role';

class Authorized extends React.Component {
  render() {
    const { children, authorizedRole, currentRole = getRole(), noMatch = null } = this.props;
    const childrenRender = typeof children === 'undefined' ? null : children;
    let role = 'NULL';
    if (currentRole.constructor.name === 'Function') {
      role = currentRole();
    } else if (role.constructor.name === 'String') {
      role = currentRole;
    }
    return CheckPermissions(
      authorizedRole,
      role,
      childrenRender,
      noMatch
    );
  }
}

// for MenuItem, SubMenu and etc. which can not be wrapped by customized component.
// https://github.com/ant-design/ant-design/issues/4853
const authorizedCreate = ({ authorizedRole, currentRole = getRole(), noMatch = null }) => {
  return (Comp) => {
    let role = 'NULL';
    if (currentRole.constructor.name === 'Function') {
      role = currentRole();
    } else if (role.constructor.name === 'String') {
      role = currentRole;
    }
    return CheckPermissions(
      authorizedRole,
      role,
      Comp,
      noMatch
    );
  };
};

Authorized.create = authorizedCreate;
export default Authorized;
