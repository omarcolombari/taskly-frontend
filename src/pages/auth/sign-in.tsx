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
import { useSignIn } from '@/http/generated/api'
import Cookies from 'universal-cookie'
import { toast } from 'sonner'
import { TOKEN_COOKIE_KEY } from '@/auth/auth'

const signInSchema = z.object({
  email: z.string().email('Informe um e-mail válido!'),
  password: z.string().min(1, 'Informe a senha.'),
})

type SignInSchema = z.infer<typeof signInSchema>

export function SignIn() {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const navigate = useNavigate()

  const { mutateAsync: signInFn } = useSignIn({
    mutation: {
      onSuccess(data) {
        const cookies = new Cookies()

        const { access_token } = data

        cookies.set(TOKEN_COOKIE_KEY, access_token, {
          path: '/',
          maxAge: 60 * 60 * 24, // 1 dia
        })

        navigate('/')
      },
      onError() {
        toast.error('Credenciais inválidas.')
      },
    },
  })

  function handleSignIn(data: SignInSchema) {
    signInFn({ data })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        <CardDescription className="text-center">
          Entre com seu e-mail e senha para acessar sua conta.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignIn)}>
          <CardContent className="space-y-4">
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
            <Button type="submit" className="w-full">
              Entrar
            </Button>
            <p className="text-center text-sm text-gray-600">
              Ainda não tem uma conta?{' '}
              <Link
                to="/sign-up"
                className="font-medium text-primary hover:underline"
              >
                Registrar
              </Link>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
