import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  getListTasksQueryKey,
  type ListTasksResponseDtoTasksItem,
  useDeleteTask,
} from '@/http/generated/api'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { AlertTriangle, Loader2, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface DeleteTaskAlertDialogProps {
  task: ListTasksResponseDtoTasksItem
}

export function DeleteTaskAlertDialog({ task }: DeleteTaskAlertDialogProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  const queryClient = useQueryClient()

  const { mutateAsync: deleteTaskFn, isPending } = useDeleteTask({
    mutation: {
      onSuccess() {
        toast.success('Tarefa deletada com sucesso!')

        queryClient.invalidateQueries({
          queryKey: getListTasksQueryKey(),
        })

        setDialogIsOpen(false)
      },
    },
  })

  async function handleDeleteTask() {
    await deleteTaskFn({
      id: task.id,
    })
  }

  return (
    <AlertDialog
      open={dialogIsOpen}
      onOpenChange={open => setDialogIsOpen(open)}
    >
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-500 dark:hover:text-red-400"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="flex gap-2 items-center">
          <AlertTriangle className="h-6 w-6 text-red-600" />
          <AlertDialogTitle className="text-xl font-semibold ">
            Excluir tarefa
          </AlertDialogTitle>

          <AlertDialogDescription className="text-center">
            Tem certeza que deseja excluir a tarefa{' '}
            <span className="font-medium text-foreground">"{task.name}"</span>?
            Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button
            onClick={handleDeleteTask}
            variant="destructive"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" /> Excluindo
              </>
            ) : (
              'Excluir'
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
