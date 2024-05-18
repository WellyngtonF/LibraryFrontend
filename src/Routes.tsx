import { createBrowserRouter } from 'react-router-dom'

import Home from './Pages/home'
import Error from './Pages/error'

import Authors from './Pages/authors'
import AuthorForm from './Pages/authors/authorForm'

import Publishers from './Pages/publishers'
import PublisherForm from './Pages/publishers/publisherForm'

import Genres from './Pages/genres'
import GenreForm from './Pages/genres/genreForm'

import Books from './Pages/books'
import BookForm from './Pages/books/bookForm'

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
    },
    {
      path: '/publishers',
      element: <Publishers />,
      errorElement: <Error />
    },
    {
      path: '/publishers/:id',
      element: <PublisherForm />,
      errorElement: <Error />
    },
    {
      path: '/genres',
      element: <Genres />,
      errorElement: <Error />
    },
    {
      path: '/genres/:id',
      element: <GenreForm />,
      errorElement: <Error />
    },
    {
      path: '/books',
      element: <Books />,
      errorElement: <Error />
    },
    {
      path: '/books/:id',
      element: <BookForm />,
      errorElement: <Error />
    }
  ]
)