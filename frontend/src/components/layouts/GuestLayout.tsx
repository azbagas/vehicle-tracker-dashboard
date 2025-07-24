import useAuthStore from '@/store/useAuthStore';
import { Navigate, Outlet } from 'react-router';

export default function GuestLayout() {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (accessToken) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
