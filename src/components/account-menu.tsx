import { ChevronDown, LogOut, User } from 'lucide-react'
import { useNavigate } from 'react-router'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import Cookies from 'universal-cookie'
import { TOKEN_COOKIE_KEY } from '@/auth/auth'
import { useGetProfileInformation } from '@/http/generated/api'
import { Skeleton } from './ui/skeleton'

export function AccountMenu() {
  const navigate = useNavigate()

  const { data: profileInformation, isLoading: isFetchingProfileInformation } =
    useGetProfileInformation()

  function handleLogout() {
    const cookies = new Cookies()

    cookies.remove(TOKEN_COOKIE_KEY)

    navigate('/sign-in')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex select-none items-center gap-2"
        >
          <User />
          {isFetchingProfileInformation ? (
            <Skeleton className="h-4 w-40" />
          ) : (
            profileInformation?.user.name
          )}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          {isFetchingProfileInformation ? (
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          ) : (
            <>
              <span>{profileInformation?.user.name}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {profileInformation?.user.email}
              </span>
            </>
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="text-rose-500 dark:text-rose-400">
          <button type="button" className="w-full" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
