import React from 'react';
import { Route, Redirect } from 'dva/router';
import Authorized from './Authorized';
import { getAuthority } from '../../utils/authority';

class AuthorizedRoute extends React.Component {
  render() {
    const { component: Component, render, authority, currentAuthority = getAuthority(),
      redirectPath, ...rest } = this.props;
    return (
      <Authorized
        authority={authority}
        currentAuthority={currentAuthority}
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
