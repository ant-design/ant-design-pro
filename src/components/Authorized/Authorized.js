import React from 'react';
import CheckPermissions from './CheckPermissions';

class Authorized extends React.Component {
  render() {
    const { children, authorizedRole, getRole, noMatch = null } = this.props;
    const childrenRender = typeof children === 'undefined' ? null : children;
    let currentRole;
    if (getRole) {
      currentRole = getRole();
    }
    return CheckPermissions(
      authorizedRole,
      currentRole,
      childrenRender,
      noMatch
    );
  }
}

// for MenuItem, SubMenu and etc. which can not be wrapped by customized component.
// https://github.com/ant-design/ant-design/issues/4853
const authorizedCreate = ({ authorizedRole, getRole, noMatch = null }) => {
  return (Comp) => {
    let currentRole;
    if (getRole) {
      currentRole = getRole();
    }
    return CheckPermissions(
      authorizedRole,
      currentRole,
      Comp,
      noMatch
    );
  };
};

Authorized.create = authorizedCreate;
export default Authorized;
