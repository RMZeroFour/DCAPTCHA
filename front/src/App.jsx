import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthenticationProvider } from './context/Authentication.jsx';
import { PageLayout } from './pages/PageLayout.jsx';
import { AdminPage } from './pages/AdminPage.jsx';
import { BotPage } from './pages/BotPage.jsx';
import { DashPage } from './pages/DashPage.jsx';
import { ErrorPage } from './pages/ErrorPage.jsx';
import { FormPage } from './pages/FormPage.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { HumanPage } from './pages/HumanPage.jsx';

const pageRouter = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'form',
        element: <FormPage />
      },
      {
        path: 'human',
        element: <HumanPage />
      },
      {
        path: 'bot',
        element: <BotPage />
      },
      {
        path: 'admin',
        element: <AdminPage />
      },
      {
        path: 'dash',
        element: <DashPage />
      },
      {
        path: '*',
        element: <ErrorPage />
      }
    ]
  }
]);

export function App() {
  return (
    <AuthenticationProvider>
      <RouterProvider router={pageRouter} />
    </AuthenticationProvider>
  );
}
