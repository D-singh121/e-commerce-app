import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import MyContextStateProvider from './context/data/MyStateProvider'

function App() {

  return (
    <>
      <MyContextStateProvider>
        <Header />
        <main >
          <Outlet />
          <ToastContainer />
        </main>
        <Footer />
      </MyContextStateProvider>
    </>
  )
}

export default App


