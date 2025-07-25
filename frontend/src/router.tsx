import { createBrowserRouter } from 'react-router';
import Layout from './components/layouts/Layout';
import GuestLayout from './components/layouts/GuestLayout';
import Login from './pages/login';
import Register from './pages/register';
import AuthLayout from './components/layouts/AuthLayout';
import Dashboard from './pages/dashboard';
import Detail from './pages/detail';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <GuestLayout />,
        children: [
          { path: '/login', element: <Login /> },
          { path: '/register', element: <Register /> },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          { path: '/', element: <Dashboard /> },
          { path: '/vehicles/:vehicleId', element: <Detail /> },
        ],
      },
      {
        path: '*',
        element: <div>Not Found</div>,
      },
    ],
  },
]);

export default router;
