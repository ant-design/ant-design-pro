// use localStorage to store the role info, which might be sent from server in actual project.
export function getRole() {
  return localStorage.getItem('antd-pro-role') || 'guest';
}

export function setRole(role) {
  return localStorage.setItem('antd-pro-role', role);
}