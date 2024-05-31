import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../Services/LoginContext";
import { Link, useNavigate } from "react-router-dom";
import ProfileImage from '../../components/ProfileImage';

export function Profile() {
  const { isLoggedIn, loggedUser, setLoggedUser } =
    useContext(LoginContext);
  const navigate = useNavigate();


  useEffect(() => {
    const user = sessionStorage.getItem("loggedUser");
    if (user) {
      setLoggedUser(JSON.parse(user));
    } else {
      navigate("/");
    }
  }, []);
  function getDate(date) {
    const data = new Date(Date.parse(date));
    if (!(data instanceof Date)) {
      return "";
    }
    return data.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  return (isLoggedIn &&
    <>
      <div className="bg-gray-400 w-4/5 m-auto rounded-3xl bg-[url(/images/profile-plane.jpg)] bg-cover bg-bottom shadow-lg font-[Rubik]">
        <div className="h-[25vh] flex justify-end items-center p-20">
          {loggedUser["@type"] == "CiaAerea" && (
            <Link
              to="/cia/perfil/edit"
              className="text-[#3758D0] text-2xl font-normal bg-white rounded-md px-4"
            >
              Editar
            </Link>
          )}
        </div>
        <div className="bg-white w-full flex p-10 rounded-b-3xl">
          <div className="rounded-full relative -top-[125px]">
            {loggedUser ? <ProfileImage loggedUser={loggedUser} /> : null}
          </div>
          <div className="w-2/3 flex justify-between items-start text-[24px] p-10">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col">
                <span className="font-normal">Razão Social:</span>
                <span className="font-light">{loggedUser.razaoSocial}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-normal">Senha:</span>
                <span className="font-light">********</span>
                <Link
                  to="/cia/troca-senha"
                  className="text-[#D03737] text-[14px] font-normal bg-white rounded-md border-solid border-2 border-current w-fit px-2"
                >
                  Trocar Senha
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-10">
              <div className="flex flex-col">
                <span className="font-normal">Login:</span>
                <span className="font-light">{loggedUser.login}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-normal">Validade Assinatura:</span>
                <span className="font-light">{loggedUser.assinatura ? getDate(loggedUser.assinatura.validade) : "Não Assinante"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
