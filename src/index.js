import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import App from './App'
import { Index } from './components/Index/Index'
import { SignIn } from './components/SignIn/SignIn'
import { SignUp } from './components/SignUp/SignUp'
import { UserAccount } from './components/UserAccount/UserAccount'
import { UserEdit } from './components/UserEdit/UserEdit'
import { ProductsContextProvider } from './contexts/ProductsContextProvider'
import { Cart } from './components/Cart/Cart'
import { store } from './redux/store'
import { FilterContextProvider } from './contexts/FilterContext/FilterContextProvider'
import { ProductDetail } from './components/ProductDetail/ProductDetail'
import { Reviews } from './components/Reviews/Reviews'
import { Favorites } from './components/Favorites/Favorites'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Index /> },
      {
        path: 'products/:id',
        element: <ProductDetail />,
      },
      {
        path: 'products/:id/reviews',
        element: <Reviews />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'favorites',
        element: <Favorites />,
      },
      {
        path: 'signin',
        element: <SignIn />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'useraccount',
        element: <UserAccount />,
      },
      {
        path: 'useraccount/edit',
        element: <UserEdit />,
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ProductsContextProvider>
        <QueryClientProvider client={queryClient}>
          <FilterContextProvider>
            <RouterProvider router={router} />
          </FilterContextProvider>
        </QueryClientProvider>
      </ProductsContextProvider>
    </Provider>
  </React.StrictMode>,
)
