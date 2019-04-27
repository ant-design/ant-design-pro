import CheckPermissions from './CheckPermissions';
import { IAuthorityType } from './CheckPermissions';
import Secured from './Secured';
import check from './CheckPermissions';
import AuthorizedRoute from './AuthorizedRoute';
import React from 'react';

interface IAuthorizedProps {
  authority: IAuthorityType;
  noMatch?: React.ReactNode;
}

type IAuthorizedType = React.FunctionComponent<IAuthorizedProps> & {
  Secured: typeof Secured;
  check: typeof check;
  AuthorizedRoute: typeof AuthorizedRoute;
};

const Authorized: React.FunctionComponent<IAuthorizedProps> = ({
  children,
  authority,
  noMatch = null,
}) => {
  const childrenRender: React.ReactNode = typeof children === 'undefined' ? null : children;
  const dom = CheckPermissions(authority, childrenRender, noMatch);
  return <>{dom}</>;
};

export default Authorized as IAuthorizedType;
