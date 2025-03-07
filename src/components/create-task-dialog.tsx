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
import { getListTasksQueryKey, useCreateTask } from '@/http/generated/api'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

const createTaskSchema = z.object({
  name: z.string().min(1, 'Informe um título para a tarefa.'),
  description: z.string().min(1, 'Informe uma descrição para a tarefa.'),
})

type CreateTaskSchema = z.infer<typeof createTaskSchema>

export function CreateTaskDialog() {
  const form = useForm({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const queryClient = useQueryClient()

  const { mutateAsync: createTaskFn, isPending } = useCreateTask({
    mutation: {
      onSuccess() {
        toast.success('Tarefa criada com sucesso!')

        queryClient.invalidateQueries({
          queryKey: getListTasksQueryKey(),
        })

        form.reset()
      },
    },
  })

  async function handleCreateTask(data: CreateTaskSchema) {
    await createTaskFn({ data })
  }

  return (
    <Dialog onOpenChange={() => form.reset()}>
      <DialogTrigger asChild>
        <Button>
          <span className="hidden sm:inline">Nova tarefa</span>
          <span className="inline sm:hidden">+</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Nova tarefa
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateTask)}
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
                    <Loader2 className="animate-spin" /> Criando
                  </>
                ) : (
                  'Criar tarefa'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
