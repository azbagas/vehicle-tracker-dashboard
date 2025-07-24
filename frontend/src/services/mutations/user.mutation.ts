import type { Login, Register } from '@/types/User';
import { useMutation } from '@tanstack/react-query';
import { login, register } from '@/services/api/user.api';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import type { ErrorResponse } from '@/types/Error';
import useAuthStore from '@/store/useAuthStore';

export function useLogin() {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setRefreshToken = useAuthStore((state) => state.setRefreshToken);

  return useMutation({
    mutationFn: (data: Login) => login(data),
    onSuccess: (data) => {
      // Set token to context
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      // Set token to localStorage
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      toast.success('Login success', {
        description: 'You have successfully logged in.',
      });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error('Login failed', {
        description: error.message,
      });
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (data: Register) => register(data),
    onSuccess: () => {
      toast.success('Registration success', {
        description: 'You have successfully registered.',
      });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error('Registration failed', {
        description: error.message,
      });
    },
  });
}
