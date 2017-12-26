import React from 'react';

class Authorized extends React.Component {
  render() {
    const { children, authorizedRole, getRole, noMatch = null } = this.props;
    const childrenRender = typeof children === 'undefined' ? null : children;
    let currentRole;
    if (getRole) {
      currentRole = getRole();
    }
    if (!authorizedRole || !authorizedRole.length) {
      return childrenRender;
    }
    return authorizedRole.indexOf(currentRole) > -1 ? childrenRender : noMatch;
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
    if (!authorizedRole || !authorizedRole.length) {
      return Comp;
    }
    return authorizedRole.indexOf(currentRole) > -1 ? Comp : noMatch;
  };
};

Authorized.create = authorizedCreate;
export default Authorized;
