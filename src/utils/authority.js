// use localStorage to store the authority info, which might be sent from server in actual project.
import { getFormatPrivilege } from '@/pages/UserManager/userUtil';

const { NODE_ENV } = process.env;

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
  if (!authority && NODE_ENV !== 'production') {
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
  const privilege = privileges.find(item => item.name === name);
  const authority = privilege ? privilege.authority : [];
  return authority;
}

export function getUser() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const user = JSON.parse(localStorage.getItem('antd-pro-user') || {});
  return user;
}

export function getUserId() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const user = getUser().id;
  console.log('authority----', user);
  return user;
}
export function getUserName() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const name = getUser().username;
  return name;
}

export function setUser(user) {
  console.log('-----setUser', JSON.stringify(user));
  return localStorage.setItem('antd-pro-user', JSON.stringify(user));
}
