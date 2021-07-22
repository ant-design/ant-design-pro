const name = 'ant-design-pro';

export function setToken(token: string) {
  localStorage.setItem(name, token);
}

export function removeToken() {
  localStorage.removeItem(name);
}

export function getToken() {
  return localStorage.getItem(name);
}

export function authorization() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : undefined;
}
