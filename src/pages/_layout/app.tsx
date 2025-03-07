import { isAuthenticated, logout } from '@/auth/auth'
import { Header } from '@/components/header'
import { api } from '@/http/client'
import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router'

export function AppLayout() {
  const navigate = useNavigate()

  if (!isAuthenticated()) {
    return <Navigate to="/sign-in" />
  }

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      response => response,
      error => {
        if (isAxiosError(error)) {
          const status = error.response?.status
          const code = error.response?.data.message

          console.log(status, code)

          if (
            status === 401 &&
            (code === 'Unauthorized' || code === 'Usuário não encontrada')
          ) {
            logout()
            navigate('/sign-in', { replace: true })
          } else {
            throw error
          }
        }
      }
    )

    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <main className="flex-1 container mx-auto py-6">
        <Outlet />
      </main>
    </div>
  )
}
