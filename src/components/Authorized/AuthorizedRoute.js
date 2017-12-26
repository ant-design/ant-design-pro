import React from 'react';
import { Route, Redirect } from 'dva/router';
import Authorized from './Authorized';

class AuthorizedRoute extends React.Component {
  render() {
    const { component: Component, render, authorizedRole, getRole, redirectPath,
      ...rest } = this.props;
    return (
      <Authorized
        authorizedRole={authorizedRole}
        getRole={getRole}
        noMatch={<Redirect to={{ pathname: redirectPath }} />}
      >
        <Route
          {...rest}
          render={props => (Component ? <Component {...props} /> : render(props))}
        />
      </Authorized>
    );
  }
}

export default AuthorizedRoute;
