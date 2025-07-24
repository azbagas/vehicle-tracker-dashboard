import { Outlet } from 'react-router';
import { Toaster } from '@/components/ui/sonner';

export default function Layout() {
  return (
    <>
      <Outlet />
      <Toaster richColors   />
    </>
  );
}
