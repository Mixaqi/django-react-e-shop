import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { router } from 'routes/Router';
import { RouterProvider } from 'react-router-dom';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
  // {/* </React.StrictMode>, */}
);
