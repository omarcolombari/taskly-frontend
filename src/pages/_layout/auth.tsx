import { isAuthenticated } from '@/auth/auth'
import { LayoutList } from 'lucide-react'
import { Navigate, Outlet } from 'react-router'

export function AuthLayout() {
  if (isAuthenticated()) {
    return <Navigate to="/" />
  }
  return (
    <div className="flex flex-col gap-5 min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2">
        <LayoutList className="size-10" />
        <h1 className="text-5xl">Taskly</h1>
      </div>
      <Outlet />
    </div>
  )
}
