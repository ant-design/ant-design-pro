import * as React from 'react';
import AuthorizedRoute, { authority } from './AuthorizedRoute';
export type IReactComponent<P = any> =
  | React.StatelessComponent<P>
  | React.ComponentClass<P>
  | React.ClassicComponentClass<P>;

type Secured = (
  authority: authority,
  error?: React.ReactNode
) => <T extends IReactComponent>(target: T) => T;

type check = <T extends IReactComponent, S extends IReactComponent>(
  authority: authority,
  target: T,
  Exception: S
) => T | S;

export interface IAuthorizedProps {
  authority: authority;
  noMatch?: React.ReactNode;
}

export class Authorized extends React.Component<IAuthorizedProps, any> {
  public static Secured: Secured;
  public static AuthorizedRoute: typeof AuthorizedRoute;
  public static check: check;
}

declare function renderAuthorize(currentAuthority: string): typeof Authorized;

export default renderAuthorize;
