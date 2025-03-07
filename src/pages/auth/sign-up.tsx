import { Link, useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useSignUp } from '@/http/generated/api'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const signUpSchema = z.object({
  name: z.string().min(1, 'Informe um nome.'),
  email: z.string().email('Informe um e-mail válido!'),
  password: z.string().min(1, 'Informe a senha.'),
})

type SignUpSchema = z.infer<typeof signUpSchema>

export function SignUp() {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })
  const navigate = useNavigate()

  const { mutateAsync: signUpFn, isPending: isSigningUp } = useSignUp({
    mutation: {
      onSuccess() {
        navigate('/sign-in')
      },
      onError() {
        toast.error('Ops, algo deu errado. Tente novamente.')
      },
    },
  })

  function handleSignUp(data: SignUpSchema) {
    signUpFn({ data })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Criar uma conta
        </CardTitle>
        <CardDescription className="text-center">
          Adicione suas informações para criar uma conta.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignUp)}>
          <CardContent className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 mt-5">
            <Button type="submit" className="w-full" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="animate-spin" /> Criando
                </>
              ) : (
                'Cadastrar'
              )}
            </Button>
            <p className="text-center text-sm text-gray-600">
              Já tem uma conta?{' '}
              <Link
                to="/sign-in"
                className="font-medium text-primary hover:underline"
              >
                Entrar
              </Link>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
