import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { environment } from '../environment.js';

//Importar Rotas

//Rotas Root
import Contact from "./Routes/Contact.jsx";
import Home from "./Routes/Home.jsx";
import Busca from "./Routes/Busca.jsx";
import ErrorPage from "./Routes/ErrorPage/ErrorPage.jsx";
import Root from "./components/Root.jsx";
import { UserRoutes, CiaRoutes, AdminRoutes } from './Routes/RouteGuard.jsx'
import { LoginContextProvider } from "./Services/LoginContext.jsx";

//User
import CadastroUsuario from "./Routes/User/CadastroUsuario.jsx";
import TelaLogin from "./Routes/User/TelaLogin.jsx";
import TrocaSenha from "./Routes/User/TrocaSenha.jsx";
import { Profile } from "./Routes/User/Profile.jsx";

//Cia Aérea
import CadastroCia from './Routes/Cia/CadastroCia.jsx';
import LoginCia from './Routes/Cia/LoginCia.jsx';
import EsqueciSenhaCia from './Routes/Cia/EsqueciSenhaCia.jsx';
import TrocaSenhaCia from './Routes/Cia/TrocaSenhaCia.jsx';
import MenuCia from "./Routes/Cia/MenuCia.jsx"
import Planos from "./Routes/Planos.jsx";
import { Profile as ProfileCia} from "./Routes/Cia/Profile.jsx";
import AdesaoPlanos from "./Routes/AdesaoPlanos.jsx";
import Dashboard from "./Routes/Dashboard.jsx";


//Aeronave
import CadastroAeronave from "./Routes/Aeronave/AeronaveEditNew.jsx";
import AeronaveList from "./Routes/Aeronave/AeronaveList.jsx";


//Componentes sem uso?
import TesteFetchComponent from "./Routes/TestePlano.jsx";
import CadastroVoo from './Routes/Voo/VooEditNew.jsx';
import VooList from './Routes/Voo/VooList.jsx';
import Logout from './Routes/Logout.jsx';
import { MdDashboard } from "react-icons/md";

//Linkar Rotas
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        element: <UserRoutes />,
        children: [
          {
            path: "perfil",
            element: <Profile />,
          },
        ]
      },
      {
        path: "planos",
        element: <Planos />
      },
      {
        path: "contact",
        element: <Contact />,
      },

      {
        path: "TesteFetch",
        element: <TesteFetchComponent />,
      },
      {
        path: "busca",
        element: <Busca />,
      },
      {
        path: "perfil/troca-senha",
        element: <TrocaSenha />,
      },
      {
        element: <CiaRoutes />, children: [
          {
            path: "cia", element: <MenuCia />, children: [
              {
                path: "aeronave/new",
                element: <CadastroAeronave/>
              },
              {
                path: "",
                element: <ProfileCia/>
              },
              {
                path: "aeronave/:id",
                element: <CadastroAeronave/>
              },
              {
                path: "aeronave",
                element: <AeronaveList/>
              },
              {
                path: "voo/new",
                element: <CadastroVoo/>
              },
              {
                path: "voo/:id",
                element: <CadastroVoo/>
              },
              {
                path: "voo",
                element: <VooList/>
              },
          ]}
        ]
      },
    ],
  },

  {/*---------CIA----------*/},
  
  {
    path: "cia", children: [
      {
        path: "registrar",
        element: <CadastroCia />
      },
      {
        path: "login",
        element: <LoginCia/>
      },
      {
        path: "dash",
        element: <Dashboard />,
      },
      {
        path: "troca-senha",
        element: <TrocaSenhaCia/>
      },
      {
        path: "esqueci",
        element: <EsqueciSenhaCia/>
      },
      {
        path:"adesao-planos",
        element: <AdesaoPlanos />
      }
     
    ]
  },
  {
    path: "/logout",
    element: <Logout/>
  },


  {
    /*-----------Login-------------*/
  },
  {
    path: "/login",
    element: <TelaLogin />,
  },
  {
    path: "registrar",
    element: <CadastroUsuario />,
  },
  {
    path: "troca_senha",
    element: <TrocaSenha />,
  },

]);



ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={environment.googleId}>
    <LoginContextProvider
      value={{ isLoggedIn: false, setIsLoggedIn: () => {} }}
    >
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </LoginContextProvider>
  </GoogleOAuthProvider>
);
