import { useContext } from 'react';
import { LoginContext } from '../Services/LoginContext';
import { Link } from 'react-router-dom';


export function Header() {
  const { isLoggedIn, loggedUser } = useContext(LoginContext)
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
        <li><Link to='/profile' title='Perfil do Usuário'>Perfil do Usuário</Link></li>
      </>)
    }
    else if (loggedUser['@type'] == 'CiaAerea') {
      return (
        <>
          <li>
            <Link to="/cia_aerea/profile" title="Perfil Cia Aérea">
              Cia Aérea
            </Link>
          </li>
        </>
      );
    }
  }
  
  return (
    <>
      <div className="bg-gray-300">
        <nav className="bg-white p-4 rounded-t-lg flex justify-between items-center">
          <div className="text-black font-bold text-xl">Logo da Empresa</div>
          <div className="flex space-x-4">
            <ul>
              {menu()}
            </ul>
            {isLoggedIn ? "Usuário Logado: " + loggedUser.nome : ""}
            <button className="rounded-lg bg-blue-700 text-white px-4 py-2">
              Televendas 0800 616 6161
            </button>
            <button className="rounded-lg bg-blue-700 text-white px-4 py-2">
              Inicie Sessão
            </button>
            <button className="rounded-lg bg-blue-700 text-white px-4 py-2">
              Viagens
            </button>
            <button className="rounded-lg bg-blue-700 text-white px-4 py-2">
              Ajuda
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
