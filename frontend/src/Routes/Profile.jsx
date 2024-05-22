import { useContext, useEffect } from "react";
import { LoginContext } from "../Services/LoginContext";
import { useNavigate } from "react-router-dom";
import { api_image_base_url } from "../Services/apiService";

export function Profile() {
  const { isLoggedIn, loggedUser, setIsLoggedIn, setLoggedUser } =
    useContext(LoginContext);
  const navigate = useNavigate();

  let image = () => {
    return (
      <>
        <img
          className="rounded-full h-[250px] aspect-square object-cover"
          src={
            loggedUser.profile_pic.includes("http")
              ? loggedUser.profile_pic
              : api_image_base_url + loggedUser.profile_pic
          }
        ></img>
      </>
    );
  };

  useEffect(() => {
    const user = sessionStorage.getItem("loggedUser");
    if (user) {
      setIsLoggedIn(true);
      setLoggedUser(JSON.parse(user));
    } else {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  if (!isLoggedIn) {
    return null;
  } else {
    return (
      <>
        <div className="bg-gray-400 w-4/5 m-auto rounded-3xl bg-[url(/images/profile-plane.jpg)] bg-cover bg-bottom shadow-lg">
          <div className="h-[25vh]"></div>
          <div className="bg-white w-full flex p-10 rounded-b-3xl">
            <div className="rounded-full relative -top-[125px]">
              {loggedUser.profile_pic ? image() : null}
            </div>
            <div className="w-2/3 flex justify-between items-start font-[Rubik] text-[24px] p-10">
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col">
                    <span className="font-normal">Nome:</span>
                    <span className="font-light">{loggedUser.nome}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-normal">Senha:</span>
                    <span className="font-light">********</span>
                  </div>
                </div>
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col">
                    <span className="font-normal">Email:</span>
                    <span className="font-light">{loggedUser.email}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-normal">Telefone:</span>
                    <span className="font-light">{loggedUser.telefone}</span>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
