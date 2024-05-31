import { useContext, useEffect } from "react";
import { LoginContext } from "../Services/LoginContext";
import { Link } from "react-router-dom";
import LogoPousar from "../assets/logo.svg";
import IconHeadset from "../assets/icon_headset.svg";
import PerfilIcon from "../assets/perfil.svg";
import IconMalac from "../assets/icon_Mala.svg";
import IconAjuda from "../assets/ajuda_icon.svg";
import { api_image_base_url } from "../Services/apiService";
import Airplane from "../../public/images/airplane.svg";
import { HiOutlineLogout } from "react-icons/hi";
import DropDownMenu from "./DropDownMenu";

export function Header() {
  const { isLoggedIn, loggedUser, setIsLoggedIn, setLoggedUser } =
    useContext(LoginContext);
  const profileImage = () => {
    if (!isLoggedIn || !loggedUser) {
      return null;
    } else if (loggedUser["@type"] == "User") {
      return api_image_base_url + loggedUser.profile_pic;
    } else if (loggedUser["@type"] == "GoogleUser") {
      return loggedUser.profile_pic;
    } else if (loggedUser["@type"] == "CiaAerea") {
      return api_image_base_url + loggedUser.logo;
    }
    return null;
  };
  const profileLink = () => {
    if (!isLoggedIn || !loggedUser) {
      return null;
    } else if (loggedUser["@type"].includes("User")) {
      return '/perfil';
    } else if (loggedUser["@type"] == "CiaAerea") {
      return '/cia';
    }
    return null;
  }

  const links = [
    {
      link: "/login",
      text: "Usuário",
    },
    {
      link: "/cia/login",
      text: "Companhia Aérea",
    },
  ];

  useEffect(() => {
    const user = sessionStorage.getItem("loggedUser");
    if (user) {
      setIsLoggedIn(true);
      setLoggedUser(JSON.parse(user));
    }
  }, []);

  return (
    <>
      <div className=" mb-2">
        <nav className=" rounded-t-lg flex justify-between px-5 items-center">
          <div className="text-black font-bold text-xl">
            <Link
              to="/"
              className="rounded-lg  px-4 py-2 flex text-gray-600 items-center gap-3"
            >
              <img src={LogoPousar} />
            </Link>
          </div>
          <div className="flex gap-5 bg-slate-300 p-3 rounded-b-xl">
            <Link className=" cursor-default rounded-lg items-center flex gap-2 text-gray-600  px-4 py-2 text-[14px]">
              <img className="h-[18px]" src={IconHeadset} />
              <p >
                Televendas <strong>0800 616 6161</strong>
              </p>
            </Link>
            <div className="w-[2px] bg-white rounded-full"></div>
            {isLoggedIn && loggedUser["@type"] && (
              <>
                <Link
                  to={profileLink()}
                  className="rounded-lg text-gray-600 px-4 py-2 flex items-center gap-2"
                >
                  <img
                    src={profileImage() ?? PerfilIcon}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src="/images/perfil.svg";
                    }}
                    className="h-[20px] object-cover rounded-full"
                  />
                  <p>Perfil</p>
                </Link>
              </>
            )}

            {!isLoggedIn && (
              <div>
                <DropDownMenu
                  text="Iniciar Sessão"
                  links={links}
                ></DropDownMenu>
              </div>
            )}
            <Link className="rounded-lg text-gray-600 px-4 py-2 flex items-center gap-2" to="/busca">
              <img src={IconMalac} />
              <p>Viagens</p>
            </Link>
            <Link className="rounded-lg text-gray-600 flex items-center px-4 py-2 gap-2">
              <img src={IconAjuda} />
              <p>Ajuda</p>
            </Link>
            {isLoggedIn && loggedUser ? (
              <Link
                to="/logout"
                className="rounded-lg text-gray-600 flex items-center px-4 py-2 gap-2"
              >
                <span className="text-[#525252]">{<HiOutlineLogout />}</span>
                <span>Sair</span>
              </Link>
            ) : null}
          </div>
        </nav>
      </div>
    </>
  );
}
