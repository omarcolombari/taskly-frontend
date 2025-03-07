import { useListTasks } from '@/http/generated/api'
import { useSearchParams } from 'react-router'
import { TaskListSkeleton } from './task-list-skeleton'
import { TaskCard } from './task-card'

export function TaskList() {
  const [searchParams] = useSearchParams()

  const statusParams = searchParams.get('filter') || 'all'

  const { data, isLoading: isFetchingTasks } = useListTasks({
    status: statusParams,
  })

  return (
    <>
      <div className="">
        {data?.tasks.length === 0 && (
          <p className="text-center font-semibold">
            Nenhuma tarefa encontrada!
          </p>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data && !isFetchingTasks ? (
            data.tasks.map(task => <TaskCard key={task.id} task={task} />)
          ) : (
            <TaskListSkeleton />
          )}
        </div>
      </div>
    </>
  )
}
