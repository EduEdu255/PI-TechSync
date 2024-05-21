import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../Services/LoginContext";
import { fetchData, loginUsuario } from "../Services/apiService";
import { Loading } from "../components/Loading.jsx";
import LoginImg from "/images/Background 5.4.svg";
import { AnimatePresence, motion } from "framer-motion";

// import styles from '../assets/css/TelaLogin2.module.css';

function TelaLogin2() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { setIsLoggedIn, setLoggedUser } = useContext(LoginContext);
  const [processando, setProcessando] = useState(false);
  const [erros, setErros] = useState(null);
  function onSubmit(event) {
    event.preventDefault();
    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    setProcessando(true);
    setErros(null);
    loginUsuario(data).then(
      (_) => {
        if (_ === true) {
          fetchData("/auth/me").then(
            (user) => {
              setLoggedUser(user);
              sessionStorage.setItem("loggedUser", JSON.stringify(user));
              setProcessando(false);
              setErros(null);
              navigate("/perfil");
            },
            (error) => {
              console.log("Erro ao buscar quem logou");
              setErros({ message: "Não foi possível identificar os dados de cadastro do usuário. Contate um administrador" });
              console.log(error);
              setProcessando(false);
            }
          );
        } else {
          setIsLoggedIn(false);
          setLoggedUser(null);
          setProcessando(false);
          setErros({message: "Login falhou. Cheque suas credenciais."})
          sessionStorage.removeItem("loggedUser");
        }
      },
      (_) => {
        console.log(_);
        setProcessando(false);
        setErros({message: "Login falhou. Cheque suas credenciais."})
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
              Insira seu email e senha para continuar!
            </p>
            <button
              className="flex w-[100%] bg-[#F4F7FE] h-14 gap-2 rounded-2xl items-center text-[#2B3674] font-semibold justify-center"
              type="button"
            >
              <img
                src="/images/Google__G__Logo 1.png"
                alt="imagem_google"
              ></img>
              Entrar com Google
            </button>
            <div className="flex items-center my-7 justify-center">
              <div className="bg-gray-300 h-[1px] w-[40%]"></div>
              <p className="mx-5 text-gray-300">ou</p>
              <div className="bg-gray-300 h-[1px] w-[40%]"></div>
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="email" className="text-[#2B3674] font-medium">
                E-mail*
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="border flex items-center justify-between h-14 px-5 rounded-2xl"
                placeholder="seuemail@gmail.com"
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
                <a href="#">Esqueceu sua senha?</a>
              </div>
            </div>
            <button className="flex w-[100%] bg-[#3758D0] h-14 gap-2 rounded-2xl my-7 items-center text-gray-50 font-semibold justify-center">
              Entrar
            </button>
            <p>
              Não possui conta?
              <Link to="/registrar" className="text-[#3758D0] font-semibold">
                {" "}
                Crie uma conta agora.
              </Link>
            </p>
          </div>
        </form>

        <div className="w-[50%] h-[100%] flex justify-center items-center rounded-bl-[150px]  bg-[url(/images/LoginIMG.jpg)] bg-cover bg-no-repeat">
          {processando ? <Loading /> : null}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default TelaLogin2;
