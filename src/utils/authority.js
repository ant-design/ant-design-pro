import { parse, stringify } from 'qs';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return parse(localStorage.getItem('antd-pro-authority')) || 'admin';
}

export function setAuthority(authority) {
  return localStorage.setItem('antd-pro-authority', stringify(authority));
}
