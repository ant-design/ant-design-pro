import { isJsonString } from '@/utils/utils';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString = localStorage.getItem('antd-pro-authority');
  let authority;
  if (isJsonString(authorityString)) {
    authority = JSON.parse(authorityString);
  } else {
    authority = [authorityString];
  }
  return authority || ['admin'];
}

export function setAuthority(authority) {
  let authorityString;
  if (isJsonString(authority)) {
    authorityString = JSON.stringify(authority);
  } else {
    authorityString = [authority];
  }
  return localStorage.setItem('antd-pro-authority', authorityString);
}
