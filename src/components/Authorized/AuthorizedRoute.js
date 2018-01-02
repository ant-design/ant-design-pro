import React from 'react';
import { Route, Redirect } from 'dva/router';
import Authorized from './Authorized';
import { getRole } from '../../utils/role';

class AuthorizedRoute extends React.Component {
  render() {
    const { component: Component, render, authorizedRole, currentRole = getRole(), redirectPath,
      ...rest } = this.props;
    return (
      <Authorized
        authorizedRole={authorizedRole}
        currentRole={currentRole}
        noMatch={<Route {...rest} render={() => <Redirect to={{ pathname: redirectPath }} />} />}
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
