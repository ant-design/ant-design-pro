import * as React from 'react';
import { RouteProps } from 'react-router';

type authorityFN = (currentAuthority?: string) => boolean;

type authority = string | string[] | authorityFN | Promise<any>;

export interface IAuthorizedRouteProps extends RouteProps {
  authority: authority;
}
export { authority };

export default class AuthorizedRoute extends React.Component<IAuthorizedRouteProps, any> {}
