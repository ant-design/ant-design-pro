import Authorized from './Authorized';
import AuthorizedRoute from './AuthorizedRoute';
import Secured from './Secured';
import check from './CheckPermissions';

const NO_AUTH = 'NULL';
// eslint-disable-next-line import/no-mutable-exports
let CURRENT = NO_AUTH;

const checkAuthority = authority => {
  if (authority) {
    if (authority.constructor.name === 'Function') {
      return authority();
    }
    if (authority.constructor.name === 'String' || authority.constructor.name === 'Array') {
      return authority;
    }
  }
  return NO_AUTH;
};

Authorized.Secured = Secured;
Authorized.AuthorizedRoute = AuthorizedRoute;
Authorized.check = check;

Authorized.getCurrentAuthority = () => CURRENT;

Authorized.replaceCurrentAuthority = nextAuthority => {
  CURRENT = checkAuthority(nextAuthority);
  return Authorized;
};

/**
 * use  authority or getAuthority
 * @param {string|()=>String} currentAuthority
 */
const renderAuthorize = currentAuthority => {
  Authorized.replaceCurrentAuthority(currentAuthority);
  return Authorized;
};

export { CURRENT };
export default renderAuthorize;
