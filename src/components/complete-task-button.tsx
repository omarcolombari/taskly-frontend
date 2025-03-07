import {
  type ListTasksResponseDto,
  type ListTasksResponseDtoTasksItem,
  getListTasksQueryKey,
  useCompleteTask,
} from '@/http/generated/api'
import { cn } from '@/lib/utils'
import { type QueryKey, useQueryClient } from '@tanstack/react-query'
import { Loader2, CheckCircle2 } from 'lucide-react'

interface CompleteTaskButtonProps {
  taskId: string
  taskStatus: string
}

export function CompleteTaskButton({
  taskId,
  taskStatus,
}: CompleteTaskButtonProps) {
  const queryClient = useQueryClient()

  function updateTaskStatusOnCache(taskId: string) {
    const pendingQueryKey = getListTasksQueryKey({ status: 'pending' })
    const completedQueryKey = getListTasksQueryKey({ status: 'completed' })

    const completedTask = updatePendingTaskCache(taskId, pendingQueryKey)

    if (completedTask) {
      updateCompletedTasksCache(completedTask, completedQueryKey)
    }

    updateGeneralTasksCache(taskId)
  }

  function updatePendingTaskCache(
    taskId: string,
    queryKey: QueryKey
  ): ListTasksResponseDtoTasksItem | undefined {
    const pendingTasksCache =
      queryClient.getQueryData<ListTasksResponseDto>(queryKey)

    if (!pendingTasksCache) return undefined

    const task = pendingTasksCache.tasks.find(task => task.id === taskId)

    if (!task) return undefined

    const updatedTask = { ...task, status: 'COMPLETED' }

    queryClient.setQueryData<ListTasksResponseDto>(queryKey, {
      ...pendingTasksCache,
      tasks: pendingTasksCache.tasks.filter(task => task.id !== taskId),
    })

    return updatedTask
  }

  function updateCompletedTasksCache(
    completedTask: ListTasksResponseDtoTasksItem,
    queryKey: QueryKey
  ) {
    const completedTasksCache =
      queryClient.getQueryData<ListTasksResponseDto>(queryKey)

    if (completedTasksCache) {
      queryClient.setQueryData<ListTasksResponseDto>(queryKey, {
        ...completedTasksCache,
        tasks: [completedTask, ...completedTasksCache.tasks],
      })
    } else {
      queryClient.setQueryData<ListTasksResponseDto>(queryKey, {
        tasks: [completedTask],
      })
    }
  }

  function updateGeneralTasksCache(taskId: string) {
    const allTasksCaches = queryClient.getQueriesData<ListTasksResponseDto>({
      queryKey: getListTasksQueryKey(),
    })

    allTasksCaches.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      queryClient.setQueryData<ListTasksResponseDto>(cacheKey, {
        ...cacheData,
        tasks: cacheData.tasks.map(task =>
          task.id === taskId ? { ...task, status: 'COMPLETED' } : task
        ),
      })
    })
  }

  const { mutateAsync: completeTaskFn, isPending: isCompletingTask } =
    useCompleteTask({
      mutation: {
        onSuccess(_, { id }) {
          updateTaskStatusOnCache(id)
        },
      },
    })

  const isCompletedTask = taskStatus === 'COMPLETED'
  return (
    <button
      type="button"
      disabled={isCompletedTask || isCompletingTask}
      onClick={() => completeTaskFn({ id: taskId })}
      className={cn(
        'mt-1 rounded-full p-0.5 transition-colors',
        isCompletedTask
          ? 'text-emerald-500 dark:text-emerald-400'
          : 'text-slate-400 hover:text-slate-600 dark:text-slate-600 dark:hover:text-slate-400'
      )}
    >
      {isCompletingTask ? (
        <Loader2 className="animate-spin size-4 text-emerald-500 dark:text-emerald-400" />
      ) : (
        <CheckCircle2 className="h-4 w-4" />
      )}
    </button>
  )
}
