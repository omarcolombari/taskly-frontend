import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import {
  getListTasksQueryKey,
  type ListTasksResponseDtoTasksItem,
  useEditTask,
} from '@/http/generated/api'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { Edit2, Loader2 } from 'lucide-react'

const editTaskSchema = z.object({
  name: z.string().min(1, 'Informe um título para a tarefa.'),
  description: z.string().min(1, 'Informe uma descrição para a tarefa.'),
})

type EditTaskSchema = z.infer<typeof editTaskSchema>

interface EditTaskDialogProps {
  task: ListTasksResponseDtoTasksItem
}

export function EditTaskDialog({ task }: EditTaskDialogProps) {
  const form = useForm({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      name: task.name,
      description: task.description,
    },
  })

  const queryClient = useQueryClient()

  const { mutateAsync: editTaskFn, isPending } = useEditTask({
    mutation: {
      onSuccess() {
        toast.success('Tarefa editada com sucesso!')

        queryClient.invalidateQueries({
          queryKey: getListTasksQueryKey(),
        })
      },
    },
  })

  async function handleEditTask(data: EditTaskSchema) {
    await editTaskFn({
      data,
      id: task.id,
    })
  }

  return (
    <Dialog onOpenChange={() => form.reset()}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Editar tarefa
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleEditTask)}
            className="space-y-4 py-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o título da tarefa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Digite a descrição da tarefa"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-6 flex gap-2">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" className="min-w-20" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin" /> Salvando
                  </>
                ) : (
                  'Salvar'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
