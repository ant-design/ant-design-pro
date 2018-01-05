import * as React from "react";
import * as H from "history";
import { RouteProps } from "react-router";

type authorityFN = () => string;

type authority = string | Array<string> | authorityFN | Promise<any>;

interface Secured {
  (authority: authority, error?: React.ReactNode): (
    target: React.ReactNode
  ) => React.ReactNode;
}

export interface AuthorizedRouteProps extends RouteProps {
  authority: authority;
}
export class AuthorizedRoute extends React.Component<
  AuthorizedRouteProps,
  any
> {
  constructor(props: AuthorizedRouteProps);
}

interface check {
  (
    authority: authority,
    target: React.ReactNode,
    Exception: React.ReactNode
  ): React.ReactNode;
}

interface AuthorizedProps {
  authority: authority;
  noMatch?: React.ReactNode;
}

export class Authorized extends React.Component<AuthorizedProps, any> {
  static Secured: Secured;
  static AuthorizedRoute: typeof AuthorizedRoute;
  static check: check;
  constructor(props: AuthorizedProps);
}

declare function renderAuthorize(currentAuthority: string): typeof Authorized;

export default renderAuthorize;
