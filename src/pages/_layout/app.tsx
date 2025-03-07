import { isAuthenticated } from '@/auth/auth'
import { Header } from '@/components/header'
import { Navigate, Outlet } from 'react-router'

export function AppLayout() {
  if (!isAuthenticated()) {
    return <Navigate to="/sign-in" />
  }

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <main className="flex-1 container mx-auto py-6">
        <Outlet />
      </main>
    </div>
  )
}
