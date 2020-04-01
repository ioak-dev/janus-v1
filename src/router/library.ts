export function getCookie(key: string) {
  const b = document.cookie.match('(^|[^;]+)\\s*' + key + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}

export function setCookie(key: string, value: string) {
  document.cookie = `${key}=${value}`;
}

export const redirectToLogin = (space: string) => {
  window.location.href = `http://localhost:3010/#/${space}/login?appId=${process.env.VUE_APP_ONEAUTH_APP_ID}`;
};
