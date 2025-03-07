import { TOKEN_COOKIE_KEY } from '@/auth/auth'
import { env } from '@/env'
import Cookies from 'universal-cookie'

async function getHeaders(headers?: HeadersInit): Promise<HeadersInit> {
  const cookies = new Cookies()
  const token = cookies.get(TOKEN_COOKIE_KEY)

  if (token) {
    return { ...headers, Authorization: `Bearer ${token}` }
  }

  return headers ?? {}
}

export async function http<T>(path: string, options: RequestInit): Promise<T> {
  const headers = await getHeaders(options.headers)

  const url = new URL(path, env.VITE_API_URL)

  const request = new Request(url, {
    ...options,
    headers,
  })

  const response = await fetch(request)

  await new Promise(resolve => setTimeout(resolve, 2000))

  if (response.ok) {
    if (response.headers.get('content-type')?.includes('application/json')) {
      const data = await response.json()

      return data as T
    }

    const data = response.text()

    return data as T
  }

  return Promise.reject(response)
}
