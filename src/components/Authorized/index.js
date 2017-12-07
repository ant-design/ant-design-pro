import React from 'react';
import { Route, Redirect } from 'dva/router';

class Authorized extends React.Component {
  render () {
    const { children, role = [], getRole, noMatch = null, ...rest } = this.props;
    let childrenRender;
    switch(typeof children)
    {
      case 'undefined':
          childrenRender = null;
          break;
      case 'string':
          childrenRender = children;
          break;
      default:
          childrenRender = React.Children.map(children, child => 
      React.cloneElement(child));
    }
    let currentRole;
    if (getRole) {
      currentRole = getRole();
    }
    return role.indexOf(currentRole) > -1 ? childrenRender : noMatch;
  }
}

class AuthorizedRoute extends React.Component {
  render () {
    const { component: Component, render, role = [], getRole, redirectPath, ...rest } = this.props;
    return (
      <Authorized
        role={role}
        getRole={getRole}
        noMatch={<Redirect to={{ pathname: redirectPath }}/>}
      >
        <Route {...rest} render={props => (
          Component ? <Component {...props}/> : render(props)
        )}/>
      </Authorized>
    );
  }
}

Authorized.AuthorizedRoute = AuthorizedRoute;

export default Authorized;
