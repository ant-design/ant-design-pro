const antdpro = 'ant-design-pro';

export function setToken(token: string) {
  localStorage.setItem(antdpro, token);
}

export function removeToken() {
  localStorage.removeItem(antdpro);
}

export function getToken() {
  return localStorage.getItem(antdpro);
}

export function authorization() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : undefined;
}
