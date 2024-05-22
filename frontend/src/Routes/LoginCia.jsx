import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../Services/LoginContext";
import { fetchData, loginCiaAerea} from "../Services/apiService";
import { Loading } from "../components/Loading.jsx";
import { AnimatePresence, motion } from "framer-motion";

function LoginCia() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { setIsLoggedIn, setLoggedUser } = useContext(LoginContext);
  const [processando, setProcessando] = useState(false);
  const [erros, setErros] = useState(null);


  function onSubmit(event) {
      event.preventDefault();
      console.log(event.target.value);
    const data = {
      login: event.target.login.value,
      password: event.target.password.value,
    };
    setProcessando(true);
    setErros(null);
    loginCiaAerea(data).then(
      (_) => {
        if (_ === true) {
          fetchData("/cia_aerea/profile").then(
            (user) => {
              setLoggedUser(user);
              sessionStorage.setItem("loggedUser", JSON.stringify(user));
              setProcessando(false);
              setErros(null);
              navigate("/perfil");
            },
            (error) => {
              console.log("Erro ao buscar dados da cia aérea logou");
              setErros({
                message:
                  "Não foi possível identificar os dados de cadastro da companhia aérea. Contate um administrador",
              });
              console.log(error);
              setProcessando(false);
            }
          );
        } else {
          setIsLoggedIn(false);
          setLoggedUser(null);
          setProcessando(false);
          setErros({ message: "Login falhou. Cheque suas credenciais." });
          sessionStorage.removeItem("loggedUser");
        }
      },
      (_) => {
        console.log(_);
        setProcessando(false);
        setErros({
          message: "Tentativa de Login falhou. Tente novamente mais tarde.",
        });
      }
    );
  }

  function toggleVisible() {
    setVisible(!visible);
  }
  function msgErro() {
    if (!erros) {
      return null;
    }
    return (
      <div className="flex items-center justify-center h-12 bg-red-400 text-white text-sm rounded-md w-full">
        {erros.message}
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        key="login"
        className="flex justify-between overflow-hidden h-screen"
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <form
          onSubmit={onSubmit}
          className="flex justify-center items-center w-[50%]"
        >
          <div className=" min-w-[27vw]">
            {msgErro()}
            <h1 className="text-[#2B3674] text-4xl ">Entrar</h1>
            <p className="text-gray-400 my-7">
              Insira seu login e senha para continuar!
            </p>
            <div className="flex flex-col gap-3">
              <label htmlFor="login" className="text-[#2B3674] font-medium">
                Login*
              </label>
              <input
                type="text"
                name="login"
                id="login"
                className="border flex items-center justify-between h-14 px-5 rounded-2xl"
                placeholder="Login"
              ></input>
              <label htmlFor="senha" className="text-[#2B3674] font-medium">
                Senha*
              </label>
              <div className="border flex items-center justify-between h-14 rounded-2xl">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  id="senha"
                  placeholder="Min. 8 characters"
                  className="w-full h-full rounded-2xl px-5"
                ></input>
                <img
                  src={
                    visible
                      ? "/images/visibility-off.svg"
                      : "/images/visibility.svg"
                  }
                  className="opacity-60"
                  onClick={toggleVisible}
                  id="btn_senha"
                ></img>
              </div>
            </div>
            <div className="flex my-4 justify-between">
              <div className="">
                <input type="checkbox" id="mante"></input>{" "}
                <label htmlFor="mante">Mantenha logado</label>
              </div>
              <div className="text-[#3758D0] font-semibold ">
                <Link to="/cia/esqueci">Esqueceu sua senha?</Link>
              </div>
            </div>
            <button className="flex w-[100%] bg-[#3758D0] h-14 gap-2 rounded-2xl my-7 items-center text-gray-50 font-semibold justify-center">
              Entrar
            </button>
            <p>
              Não possui conta?
              <Link to="/cia/registrar" className="text-[#3758D0] font-semibold">
                {" "}
                Crie uma conta agora.
              </Link>
            </p>
          </div>
        </form>

          {processando ? <Loading /> : null}
              <div className="w-[50%] h-[100%] flex justify-center items-center rounded-bl-[150px] rounded-tl-lg  bg-[url(/images/cia-login.jpg)] bg-cover bg-no-repeat">
                  <img src="/images/logo-Pousar.png"></img>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default LoginCia;
