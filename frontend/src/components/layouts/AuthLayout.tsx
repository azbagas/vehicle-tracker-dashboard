import { Outlet, Navigate, NavLink } from 'react-router';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/services/api/user.api';
import useAuthStore from '@/store/useAuthStore';
import { Menu, X } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useLogout } from '@/services/mutations/user.mutation';
import { Button } from '../ui/button';
import Spinner from '../shared/Spinner';
import { clsx } from 'clsx';

export default function AuthLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);

  // Logout
  const { mutate, isPending } = useLogout();

  // Set user data to state
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

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r p-4 transform transition-transform duration-300 md:relative md:translate-x-0 md:block ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-6 md:hidden">
          <span className="text-xl font-semibold">Menu</span>
          <button onClick={() => setMenuOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="text-xl font-semibold mb-6 hidden md:block">
          Vehicle Tracker
        </div>
        <nav className="space-y-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              clsx(
                'block text-sm text-gray-700 hover:text-black hover:bg-gray-200 p-2 rounded',
                isActive ? 'bg-gray-200' : ''
              )
            }
          >
            Dashboard
          </NavLink>
          <Button
            variant={'secondary'}
            onClick={() => mutate({ refreshToken: refreshToken ?? '' })}
            className="block w-full text-sm mt-16"
            disabled={isPending}
          >
            Logout {isPending && <Spinner />}
          </Button>
        </nav>
      </aside>

      {/* Overlay for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 w-full ">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMenuOpen(true)}
              className="block md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <p>Halo, {user?.name}!</p>
            <Avatar>
              <AvatarFallback><img src="https://robohash.org/fwwfw?set=set4" alt="" /></AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Cards */}
        <Outlet />
      </main>
    </div>
  );
}
