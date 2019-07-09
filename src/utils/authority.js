// use localStorage to store the authority info, which might be sent from server in actual project.
import { getFormatPrivilege } from '@/pages/UserManager/userUtil';

export function getAuthority(str) {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem('antd-pro-authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  if (!authority && ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return ['admin'];
  }
  return authority;
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}

export function getPrivileges() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const privileges = JSON.parse(localStorage.getItem('antd-pro-privileges'));
  return privileges;
}

export function setPrivileges(privileges) {
  return localStorage.setItem('antd-pro-privileges', JSON.stringify(privileges));
}

export function setFormatPrivileges(privileges) {
  const formatPrivilege = getFormatPrivilege(privileges);
  return localStorage.setItem('antd-pro-format-privileges', JSON.stringify(formatPrivilege));
}

export function getFormatPrivileges() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const privileges = JSON.parse(localStorage.getItem('antd-pro-format-privileges'));
  return privileges;
}

export function getAuth(name) {
  const privileges = getFormatPrivileges();
  const privilege = privileges?privileges.find(item => item.name === name):undefined;
  const authority = privilege ? privilege.authority : [];
  return authority;
}

export function getUser() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const userJsonStr=localStorage.getItem('antd-pro-user');
  const user = userJsonStr?JSON.parse(userJsonStr):{};
  return user;
}

export function getUserId() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const user = getUser().id;
  return user;
}
export function getUserName() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const name = getUser().username;
  return name;
}

export function setUser(user) {
  return localStorage.setItem('antd-pro-user', JSON.stringify(user));
}
