import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Authorized from './Authorized';

class AuthorizedRoute extends React.Component {
  render() {
    const {
      component: Component,
      render,
      authority,
      currentAuthority,
      redirectPath,
      ...rest
    } = this.props;
    return (
      <Authorized
        authority={authority}
        currentAuthority={currentAuthority}
        noMatch={
          <Route
            {...rest}
            render={() => <Redirect to={{ pathname: redirectPath }} />}
          />
        }
      >
        <Route
          {...rest}
          render={props =>
            (Component ? <Component {...props} /> : render(props))
          }
        />
      </Authorized>
    );
  }
}

export default AuthorizedRoute;
