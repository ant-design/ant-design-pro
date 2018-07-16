// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authority = localStorage.getItem('antd-pro-authority');
  return authority ? JSON.parse(authority) : 'admin';
}

export function setAuthority(authority) {
  return localStorage.setItem('antd-pro-authority', JSON.stringify(authority));
}
