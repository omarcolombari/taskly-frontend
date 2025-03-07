import { TOKEN_COOKIE_KEY } from '@/auth/auth'
import { env } from '@/env'
import Cookies from 'universal-cookie'
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'

async function getHeaders(
  headers?: HeadersInit
): Promise<Record<string, string>> {
  const cookies = new Cookies()
  const token = cookies.get(TOKEN_COOKIE_KEY)

  const headersObject: Record<string, string> = {}

  if (headers) {
    if (headers instanceof Headers) {
      headers.forEach((value, key) => {
        headersObject[key] = value
      })
    } else if (Array.isArray(headers)) {
      headers.forEach(([key, value]) => {
        headersObject[key] = value
      })
    } else {
      Object.assign(headersObject, headers)
    }
  }

  if (token) {
    headersObject['Authorization'] = `Bearer ${token}`
  }

  return headersObject
}

export const api = axios.create({
  baseURL: env.VITE_API_URL,
})

export async function http<T>(path: string, options: RequestInit): Promise<T> {
  const headers = await getHeaders(options.headers)

  const axiosConfig: AxiosRequestConfig = {
    method: options.method,
    headers,
    data: options.body,
    url: path,
    baseURL: env.VITE_API_URL,
  }

  await new Promise(resolve => setTimeout(resolve, 2000))
  const response: AxiosResponse = await api.request(axiosConfig)

  if (response.status >= 200 && response.status < 300) {
    const contentType = response.headers['content-type']
    if (contentType?.includes('application/json')) {
      return response.data as T
    }
    return response.data as T
  }

  return Promise.reject({
    ok: false,
    status: response.status,
    statusText: response.statusText,
    json: () => Promise.resolve(response.data),
    text: () =>
      Promise.resolve(
        typeof response.data === 'string'
          ? response.data
          : JSON.stringify(response.data)
      ),
  })
}
