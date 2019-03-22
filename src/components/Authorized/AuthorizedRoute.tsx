import React from 'react';
import { RouteProps } from 'react-router';
import { Route, Redirect } from 'umi';
import Authorized from './Authorized';
import { Authority } from './CheckPermissions';

export interface AuthorizedRouteProps extends RouteProps {
  authority: Authority;
  redirectPath: string;
}

// TODO: umi只会返回render和rest
const AuthorizedRoute: React.FC<AuthorizedRouteProps> = ({
  component: Component,
  render,
  authority,
  redirectPath,
  ...rest
}) => (
  <Authorized
    authority={authority}
    noMatch={<Route {...rest} render={() => <Redirect to={{ pathname: redirectPath }} />} />}
  >
    <Route {...rest} render={props => (Component ? <Component {...props} /> : render(props))} />
  </Authorized>
);

export default AuthorizedRoute;
