import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App"
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import Allprouducts from './pages/apllProducts/Allprouducts';
import Order from "./pages/order/Order.jsx"
import Cart from "./pages/cart/Cart.jsx"
import Dashboard from './pages/admin/dashBoard/Dashboard.jsx'
import Nopage from "./pages/noPage/Nopage.jsx"
import Login from './pages/registration/Login.jsx'
import Signup from './pages/registration/SignUp.jsx'
import Header from './components/header/Header.jsx'
import Footer from './components/footer/Footer.jsx'
import ProductInfo from './pages/productInfo/ProductInfo.jsx'

import myStore from './redux/Store.jsx'
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,

    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/header',
        element: <Header />
      },
      {
        path: '/footer',
        element: <Footer />
      },
      {
        path: '/allproducts',
        element: <Allprouducts />
      },
      {
        path: '/productinfo/:id',
        element: <ProductInfo />
      },
      {
        path: '/order',
        element: <Order />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/dashboard',
        element: <Dashboard />,

      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '*',
        element: <Nopage />
      }

    ]
  },
])




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={myStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
