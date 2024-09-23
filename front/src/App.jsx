import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PageLayout } from './pages/PageLayout.jsx';
import { FormPage } from './pages/FormPage.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { HumanPage } from './pages/HumanPage.jsx';
import { BotPage } from './pages/BotPage.jsx';
import { ErrorPage } from './pages/ErrorPage.jsx';

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
        path: '*',
        element: <ErrorPage />
      }
    ]
  }
]);

export function App() {
  return <RouterProvider router={pageRouter} />;
}
