import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

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
import { Profile } from './Routes/Profile.jsx';

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
        path: "profile",
        element: <Profile/>
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "login",
        element: <TelaLogin2 />,
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
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <LoginContextProvider value={{ isLoggedIn: false, setIsLoggedIn: () => {} }}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </LoginContextProvider>
);
