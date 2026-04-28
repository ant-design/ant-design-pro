const AUTH_TOKEN_KEY = 'antd-pro-auth-token';

function clearToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
}

export function getToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY) || sessionStorage.getItem(AUTH_TOKEN_KEY);
}

export function setToken(token: string, remember: boolean = true): void {
  clearToken();
  if (remember) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    sessionStorage.setItem(AUTH_TOKEN_KEY, token);
  }
}

export function removeToken(): void {
  clearToken();
}