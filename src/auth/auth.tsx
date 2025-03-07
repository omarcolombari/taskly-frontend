import Cookies from 'universal-cookie'

export const TOKEN_COOKIE_KEY = 'task-management.token'

export function isAuthenticated() {
  const cookies = new Cookies()

  return !!cookies.get(TOKEN_COOKIE_KEY)
}
