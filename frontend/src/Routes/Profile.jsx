import { useContext, useEffect } from "react";
import { LoginContext } from "../Services/LoginContext";
import { useNavigate } from "react-router-dom";
import { api_image_base_url } from "../Services/apiService";

export function Profile() {
  const { isLoggedIn, loggedUser } = useContext(LoginContext);
  const navigate = useNavigate();

  console.log(loggedUser);
  let image = () => {
    return (
      <>
        <div>
          <img src={api_image_base_url + loggedUser.profile_pic}></img>
        </div>
      </>
    );
    };
    useEffect(() => {   
        if (!isLoggedIn) {
            navigate("/");
        }
    },[isLoggedIn, navigate]) 
  if (!isLoggedIn) {
    return null;
  } else {
    return (
      <>
        <div className="bg-gray-400 w-1/2 m-auto rounded-md p-4">
          <div>Nome: {loggedUser.nome}</div>
          <div>Email: {loggedUser.email}</div>
          <div>CPF: {loggedUser.cpf}</div>
          <div>Endereço: {loggedUser.logradouro.length > 0 ? loggedUser.logradouro : ''}{loggedUser.numero.length > 0 ? " " + loggedUser.numero : ''}{loggedUser.complemento.length > 0 ? ", " + loggedUser.complemento : ''}{loggedUser.municipio.length > 0 ? ". " + loggedUser.municipio : ''}{loggedUser.uf.length > 0 ? "/" + loggedUser.uf: ''}</div>
          {loggedUser.profile_pic ? image() : null}
        </div>
      </>
    );
  }
}
