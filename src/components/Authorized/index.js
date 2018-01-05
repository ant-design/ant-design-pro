import Authorized from './Authorized';
import AuthorizedRoute from './AuthorizedRoute';
import Secured from './Secured';
import check from './CheckPermissions.js';
import PreAuthorize from './PreAuthorize';
/**
 * 默认不能访问任何页面
 * default is "NULL"
 */
/* eslint-disable import/no-mutable-exports */
let CURRENT = 'NULL';

Authorized.Secured = Secured;
Authorized.AuthorizedRoute = AuthorizedRoute;
Authorized.check = check;
Authorized.PreAuthorize = PreAuthorize;
/**
 * use  authority or getAuthority
 * @param {string|()=>String} currentAuthority
 */
const renderAuthorize = (currentAuthority) => {
  if (currentAuthority) {
    if (currentAuthority.constructor.name === 'Function') {
      CURRENT = currentAuthority();
    }
    if (currentAuthority.constructor.name === 'String') {
      CURRENT = currentAuthority;
    }
  } else {
    CURRENT = 'NULL';
  }
  return Authorized;
};

export { CURRENT };
export default renderAuthorize;
