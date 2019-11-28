import { parse } from 'qs';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function setAuthority(authority: string | string[]) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}
