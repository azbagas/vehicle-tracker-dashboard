import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { loginSchema, type Login } from '@/types/User';
import { useLogin } from '@/services/mutations/user.mutation';
import Spinner from '@/components/shared/Spinner';
import { Link } from 'react-router';

export default function Login() {
  const { mutate, isPending } = useLogin();

  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: Login) => {
    mutate(data);
  };

  return (
    <main className="h-screen flex flex-col items-center justify-center gap-8 px-4">
      <h1 className="text-2xl font-semibold">Login</h1>
      <Card className="w-full max-w-md">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email@gmail.com"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        {...field}
                        type="password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                Login {isPending && <Spinner />}
              </Button>
            </form>
          </Form>
          {/* Register link */}
          <div className="mt-4 text-center">
            <span>Don't have an account? </span>
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
