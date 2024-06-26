import App from 'App';
import { createBrowserRouter } from 'react-router-dom';
import NotFound from 'pages/NotFound';
import Dashboard from 'pages/dashboard/Dashboard';
import VerifyEmail from 'pages/auth/VerifyEmail';
import About from '../pages/About';
import Contacts from '../pages/Contacts';
import Home from '../pages/Home';
import CPU from '../pages/hardware/CPU';
import Cases from '../pages/hardware/Cases';
import Cooling from '../pages/hardware/Cooling';
import GPU from '../pages/hardware/GPU';
import HDD from '../pages/hardware/HDD';
import Motherboard from '../pages/hardware/Motherboard';
import PSU from '../pages/hardware/PSU';
import RAM from '../pages/hardware/RAM';
import SSD from '../pages/hardware/SSD';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contacts',
        element: <Contacts />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'hardware',
        children: [
          {
            path: 'cpu',
            element: <CPU />,
          },
          {
            path: 'ssd',
            element: <SSD />,
          },
          {
            path: 'hdd',
            element: <HDD />,
          },
          {
            path: 'gpu',
            element: <GPU />,
          },
          {
            path: 'psu',
            element: <PSU />,
          },
          {
            path: 'ram',
            element: <RAM />,
          },
          {
            path: 'motherboard',
            element: <Motherboard />,
          },
          {
            path: 'cooling',
            element: <Cooling />,
          },
          {
            path: 'cases',
            element: <Cases />,
          },
        ],
      },
      {
        path: 'verify-email/:userId/:token',
        element: <VerifyEmail />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
