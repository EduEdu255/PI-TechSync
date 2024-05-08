import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

//Importar Rotas
import Contact from './Routes/Contact.jsx';
import Home from './Routes/Home.jsx';
import Teste from './Routes/Teste.jsx';
import TesteFetchComponent from './Routes/TestePlano.jsx';




//Linkar Rotas
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "/Teste",
    element: <Teste />
  },
  {
    path: "/TesteFetch",
    element: <TesteFetchComponent />
  }


  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
