import type { Login, Register } from '@/types/User';
import { useMutation } from '@tanstack/react-query';
import { login, logout, register } from '@/services/api/user.api';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import type { ErrorResponse } from '@/types/Error';
import useAuthStore from '@/store/useAuthStore';
import { useNavigate } from 'react-router';

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
        description: error.response?.data.errors || error.message,
      });
    },
  });
}

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: Register) => register(data),
    onSuccess: () => {
      toast.success('Registration success', {
        description: 'You have successfully registered.',
      });

      navigate('/login');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error);
      toast.error('Registration failed', {
        description: error.response?.data.errors || error.message,
      });
    },
  });
}

export function useLogout() {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setRefreshToken = useAuthStore((state) => state.setRefreshToken);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: { refreshToken: string }) => logout(data),
    onSuccess: () => {
      // Clear tokens and user data
      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      toast.success('Logout success', {
        description: 'You have successfully logged out.',
      });

      navigate('/login');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error('Logout failed', {
        description: error.response?.data.errors || error.message,
      });
    },
  });
}
