// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString = localStorage.getItem('antd-pro-authority');
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = [authorityString];
  }
  return authority || ['admin'];
}

export function setAuthority(authority) {
  return localStorage.setItem('antd-pro-authority', JSON.stringify(authority));
}
