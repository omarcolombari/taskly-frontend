import type { ListTasksResponseDtoTasksItem } from '@/http/generated/api'
import { cn } from '@/lib/utils'
import { DeleteTaskAlertDialog } from './delete-task-dialog'
import { EditTaskDialog } from './edit-task-dialog'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from './ui/card'
import { CompleteTaskButton } from './complete-task-button'
import { format } from 'date-fns'

interface TaskCardProps {
  task: ListTasksResponseDtoTasksItem
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card
      key={task.id}
      className={cn(
        'group relative overflow-hidden transition-all duration-200 hover:shadow-lg dark:hover:shadow-primary/5',
        'before:absolute before:inset-0 before:-z-10 before:opacity-0 before:transition-opacity dark:before:bg-gradient-to-b dark:before:from-primary/10 dark:before:to-transparent dark:hover:before:opacity-100',
        task.status === 'COMPLETED'
          ? 'dark:bg-emerald-950/20 dark:hover:bg-emerald-950/30'
          : 'dark:hover:bg-primary/5',
        'dark:btask-slate-800 dark:bg-slate-950/50 dark:backdrop-blur-xl'
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2">
            <CompleteTaskButton taskId={task.id} taskStatus={task.status} />
            <CardTitle
              className={cn(
                'text-lg transition-colors',
                task.status === 'COMPLETED' &&
                  'text-muted-foreground line-through'
              )}
            >
              {task.name}
            </CardTitle>
          </div>
          <div className="flex gap-1">
            <EditTaskDialog task={task} />
            <DeleteTaskAlertDialog task={task} />
          </div>
        </div>
        <CardDescription className="ml-7 text-xs">
          Criada em:{' '}
          {format(new Date(task.createdAt), "dd/MM/yyyy 'às' HH:mm ")}
        </CardDescription>
        <CardDescription className="ml-7 text-xs text-emerald-800 underlined dark:text-emerald-500">
          {task.completedAt &&
            `Completada em ${format(new Date(task.completedAt), "dd/MM/yyyy 'às' HH:mm ")}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <p
          className={cn(
            'ml-7 text-sm line-clamp-2',
            task.status === 'COMPLETED'
              ? 'text-muted-foreground'
              : 'dark:text-slate-400'
          )}
        >
          {task.description}
        </p>
      </CardContent>
      <div
        className={cn(
          'absolute bottom-0 left-0 h-1 w-full transition-all duration-200',
          task.status === 'COMPLETED'
            ? 'bg-emerald-500/20'
            : 'bg-primary/20 group-hover:bg-primary/30'
        )}
      />
    </Card>
  )
}
