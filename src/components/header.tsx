import { Home, LayoutList } from 'lucide-react'
import { NavLink } from 'react-router'
import { ThemeToggle } from './theme/theme-toggle'
import { Separator } from './ui/separator'
import { AccountMenu } from './account-menu'

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <div className="flex items-center gap-2">
          <LayoutList className="size-6" />
          <h1 className="font-semibold text-lg">Taskly</h1>
        </div>

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/" className="flex items-center gap-2 ">
            <Home className="h-4 w-4" />
            Início
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </header>
  )
}
