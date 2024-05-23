import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { environment } from '../environment.js';

//Importar Rotas
import Contact from "./Routes/Contact.jsx";
import Home from "./Routes/Home.jsx";
import TelaLogin2 from "./Routes/TelaLogin2.jsx";
import TesteFetchComponent from "./Routes/TestePlano.jsx";
import { LoginTeste } from "./Routes/TESTE_LOGIN.jsx";
import { TesteMe } from "./Routes/TESTE_ME.jsx";
import TesteRota from "./Routes/TesteRota.jsx";
import Busca from "./Routes/Busca.jsx";
import ErrorPage from "./Routes/ErrorPage/ErrorPage.jsx";
import Root from "./components/Root.jsx";
import { LoginContextProvider } from "./Services/LoginContext.jsx";
import { Profile } from "./Routes/Profile.jsx";
import CadastroUsuario from "./Routes/CadastroUsuario.jsx";
import PasswordRecovery from "./Routes/recoverypassword.jsx";
import TrocaSenha from "./Routes/TrocaSenha.jsx";
import CadastroCia from './Routes/CadastroCia.jsx';
import LoginCia from './Routes/LoginCia.jsx';
import TrocaSenhaCia from './Routes/TrocaSenhaCia.jsx';
import EsqueciSenhaCia from './Routes/EsqueciSenhaCia.jsx';
import { UserRoutes, CiaRoutes, AdminRoutes } from './Routes/RouteGuard.jsx'

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
        path: "contact",
        element: <Contact />,
      },

      {
        path: "TesteFetch",
        element: <TesteFetchComponent />,
      },
      {
        path: "Login_Teste",
        element: <LoginTeste />,
      },
      {
        path: "me",
        element: <TesteMe />,
      },
      {
        path: "testeRota",
        element: <TesteRota />,
      },
      {
        path: "busca",
        element: <Busca />,
      },
      {
        path: "troca_senha",
        element: <PasswordRecovery />,
      },
      {
        path: "perfil/troca-senha",
        element: <TrocaSenha />,
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
        path: "troca-senha",
        element: <TrocaSenhaCia/>
      },
      {
        path: "esqueci",
        element: <EsqueciSenhaCia/>
      }
    ]
  },


  {
    /*-----------Login-------------*/
  },
  {
    path: "/login",
    element: <TelaLogin2 />,
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
