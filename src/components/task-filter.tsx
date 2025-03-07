import { Button } from '@/components/ui/button'
import { CheckCircle, Circle, ListFilter } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSearchParams } from 'react-router'

type FilterOption = 'all' | 'pending' | 'completed'

export function TaskFilter() {
  const [searchParams, setSearchParams] = useSearchParams()

  function getFilterFromUrl(): FilterOption {
    const filterParam = searchParams.get('filter')

    if (filterParam === 'pending' || filterParam === 'completed') {
      return filterParam as FilterOption
    }

    return 'all'
  }

  const currentFilter = getFilterFromUrl()

  function handleFilterChange(newFilter: FilterOption) {
    setSearchParams(state => {
      state.set('filter', newFilter)

      return state
    })
  }

  return (
    <div className="flex items-center gap-2">
      {/* Desktop view - Pills */}
      <div className="hidden md:flex items-center gap-2 rounded-lg border dark:border-slate-800 p-1 bg-background/50 dark:bg-slate-950/50 backdrop-blur-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFilterChange('all')}
          className={cn(
            'rounded-md text-sm h-8 px-3 gap-2',
            currentFilter === 'all'
              ? 'bg-primary/10 text-primary dark:bg-primary/90 dark:text-primary-foreground'
              : 'hover:bg-primary/5 dark:hover:bg-primary/10'
          )}
        >
          <ListFilter className="h-3.5 w-3.5" />
          <span>Todas</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFilterChange('pending')}
          className={cn(
            'rounded-md text-sm h-8 px-3 gap-2',
            currentFilter === 'pending'
              ? 'bg-primary/10 text-primary dark:bg-primary/90 dark:text-primary-foreground'
              : 'hover:bg-primary/5 dark:hover:bg-primary/10'
          )}
        >
          <Circle className="h-3.5 w-3.5" />
          <span>Pendentes</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFilterChange('completed')}
          className={cn(
            'rounded-md text-sm h-8 px-3 gap-2',
            currentFilter === 'completed'
              ? 'bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20 dark:text-emerald-400'
              : 'hover:bg-primary/5 dark:hover:bg-primary/10'
          )}
        >
          <CheckCircle className="h-3.5 w-3.5" />
          <span>Concluídas</span>
        </Button>
      </div>

      {/* Mobile view - Dropdown */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 dark:bg-slate-950/50 dark:border-slate-800 dark:hover:bg-slate-900/50"
            >
              <ListFilter className="h-4 w-4" />
              <span>
                {currentFilter === 'all' && 'Todas'}
                {currentFilter === 'pending' && 'Pendentes'}
                {currentFilter === 'completed' && 'Concluídas'}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="dark:bg-slate-900/90 dark:backdrop-blur-xl dark:border-slate-800"
          >
            <DropdownMenuRadioGroup
              value={currentFilter}
              onValueChange={value => handleFilterChange(value as FilterOption)}
            >
              <DropdownMenuRadioItem
                value="ALL"
                className="gap-2 dark:focus:bg-primary/10"
              >
                <ListFilter className="h-4 w-4 mr-1" />
                Todas
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="PENDING"
                className="gap-2 dark:focus:bg-primary/10"
              >
                <Circle className="h-4 w-4 mr-1" />
                Pendentes
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="COMPLETED"
                className="gap-2 dark:focus:bg-primary/10"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Concluídas
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
