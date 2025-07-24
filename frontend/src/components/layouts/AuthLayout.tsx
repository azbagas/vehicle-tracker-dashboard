import { Outlet, Navigate } from 'react-router';
import { useEffect } from 'react';
import { getCurrentUser } from '@/services/api/user.api';
import useAuthStore from '@/store/useAuthStore';

export default function AuthLayout() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setUser = useAuthStore((state) => state.setUser);

  // Set user data to context
  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };
    fetchUser();
  }, [setUser]);

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
