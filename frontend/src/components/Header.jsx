import { useContext, useEffect } from 'react';
import { LoginContext } from '../Services/LoginContext';
import { Link } from 'react-router-dom';
import LogoPousar from "../assets/logo.svg"
import IconHeadset from "../assets/icon_headset.svg"
import PerfilIcon from "../assets/perfil.svg"
import IconMalac from "../assets/icon_Mala.svg"
import IconAjuda from '../assets/ajuda_icon.svg'

export function Header() {
  const { isLoggedIn, loggedUser, setIsLoggedIn, setLoggedUser } = useContext(LoginContext)
  console.log("LoggedIn")
  console.log(isLoggedIn)
  console.log("loggedUser")
  console.log(loggedUser)
  const menu = () => {
    if (!isLoggedIn) {
      return ''
    }
    if (loggedUser['@type'] == 'User') {

      return (
        <>
          <li><Link to='/perfil' title='Perfil do Usuário'>Perfil do Usuário</Link></li>
        </>)
    }
    else if (loggedUser['@type'] == 'CiaAerea') {
      return (
        <>
          <li>
            <Link to="/cia_aerea/perfil" title="Perfil Cia Aérea">
              Cia Aérea
            </Link>
          </li>
        </>
      );
    }
  }

  useEffect(() => {
    const user = sessionStorage.getItem('loggedUser');
    if (user) {
      setIsLoggedIn(true);
      setLoggedUser(JSON.parse(user));
    }
  }, []);

  return (
    <>
      <div className="bg-gray-300">
        <nav className="bg-white rounded-t-lg flex justify-between px-5 items-center">
          <div className="text-black font-bold text-xl">
            <Link to='/' className="rounded-lg  px-4 py-2 flex text-gray-600 items-center gap-3">
              <img src={LogoPousar} />
            </Link>
          </div>
          <div className="flex gap-5 bg-slate-300 p-3 rounded-b-xl">
            <ul>
              {menu()}
            </ul>
            {isLoggedIn ? "Usuário Logado: " + loggedUser.nome : ""}
            <Link className="rounded-lg items-center flex gap-2 text-gray-600  px-4 py-2 text-[14px]">
              <img className='h-[18px]' src={IconHeadset} />
              <p>Televendas <strong>0800 616 6161</strong>
              </p>
            </Link>
            <div className='w-[2px] bg-white rounded-full'></div>
            <Link to='/login' className="rounded-lg  px-4 py-2 flex text-gray-600 items-center gap-3">
              <img src={PerfilIcon} />
              <p>
                Inicie Sessão
              </p>
            </Link>
            <Link className="rounded-lg text-gray-600 px-4 py-2 flex items-center gap-2">
              <img src={IconMalac} />
              <p>
                Viagens
              </p>
            </Link>
            <Link className="rounded-lg text-gray-600 flex items-center px-4 py-2 gap-2">
              <img src={IconAjuda} />
              <p>
                Ajuda
              </p>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
