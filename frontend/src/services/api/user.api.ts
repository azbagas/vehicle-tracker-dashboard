import axiosInstance from '@/lib/axiosInstance';
import type { Login, User, Register } from '@/types/User';

export async function login(data: Login): Promise<{
  accessToken: string;
  refreshToken: string;
}> {
  const response = await axiosInstance.post('/users/login', data);
  return {
    accessToken: response.data.data.accessToken,
    refreshToken: response.data.data.refreshToken,
  };
}

export async function register(data: Register): Promise<{
  user: User;
}> {
  const response = await axiosInstance.post('/users/register', data);
  return {
    user: response.data.data.user,
  };
}

export async function getCurrentUser(): Promise<User> {
  const response = await axiosInstance.get('/users/current');
  return response.data.data.user;
}
