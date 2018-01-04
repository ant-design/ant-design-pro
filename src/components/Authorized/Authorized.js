import React from 'react';
import CheckPermissions from './CheckPermissions';

class Authorized extends React.Component {
  render() {
    const { children, authority, noMatch = null } = this.props;
    const childrenRender = typeof children === 'undefined' ? null : children;
    return CheckPermissions(
      authority,
      childrenRender,
      noMatch
    );
  }
}

// for MenuItem, SubMenu and etc. which can not be wrapped by customized component.
// https://github.com/ant-design/ant-design/issues/4853
const authorizedCreate = ({ authority, noMatch = null }) => {
  return (Comp) => {
    return CheckPermissions(
      authority,
      Comp,
      noMatch
    );
  };
};

Authorized.create = authorizedCreate;
export default Authorized;
