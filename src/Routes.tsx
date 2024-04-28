import { createBrowserRouter } from 'react-router-dom'

import Home from './Pages/home'
import Authors from './Pages/authors'
import AuthorForm from './Pages/authors/authorForm'
import Error from './Pages/error'

export const Router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />,
      errorElement: <Error />
    },
    {
      path: '/authors',
      element: <Authors />,
      errorElement: <Error />,
    },
    {
      path: '/authors/:id',
      element: <AuthorForm />,
      errorElement: <Error />
    }
      
  ]
)