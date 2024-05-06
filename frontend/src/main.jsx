import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//Importar Rotas
import Contact from './Routes/Contact.jsx';
import Home from './Routes/Home.jsx';
import Teste from './Routes/Teste.jsx';




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
  }

  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
