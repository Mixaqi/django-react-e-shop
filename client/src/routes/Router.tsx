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
import ResetPassword from 'pages/auth/passwordReset/ResetPassword';
import ResetPasswordSuccessful from 'pages/auth/passwordReset/ResetPasswordSuccessful';
import ProductList from 'components/ProductCards/ProductList';

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
            path: 'hdd:/hdd',
            element: <ProductList />,
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
            path: 'cases/:cases',
            // element: <Cases />,
            element: <ProductList />,
          },
        ],
      },
      {
        path: ':category',
        element: <ProductList />,
      },
      {
        path: 'verify-email/:userId/:token',
        element: <VerifyEmail />,
      },
      {
        path: 'reset_password',
        element: <ResetPassword />,
        children: [
          {
            path: 'confirm',
            element: <ResetPasswordSuccessful />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
