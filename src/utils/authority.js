// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return localStorage.getItem('antd-pro-authority') || 'guest';
}

export function setAuthority(authority = 'guest') {
  return localStorage.setItem('antd-pro-authority', authority);
}
