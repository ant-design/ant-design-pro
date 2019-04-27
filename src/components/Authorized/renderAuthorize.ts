/* eslint-disable import/no-mutable-exports */
let CURRENT: string | string[] = 'NULL';
/**
 * use  authority or getAuthority
 * @param {string|()=>String} currentAuthority
 */
const renderAuthorize = (Authorized: any) => (
  currentAuthority: string | string[] | (() => typeof CURRENT),
) => {
  if (currentAuthority) {
    if (typeof currentAuthority === 'function') {
      CURRENT = currentAuthority();
    }
    if (
      Object.prototype.toString.call(currentAuthority) === '[object String]' ||
      Array.isArray(currentAuthority)
    ) {
      CURRENT = currentAuthority as string[];
    }
  } else {
    CURRENT = 'NULL';
  }
  return Authorized;
};

export { CURRENT };
export default (Authorized: any) => renderAuthorize(Authorized);
