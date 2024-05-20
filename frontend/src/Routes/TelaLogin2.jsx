import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { LoginContext } from '../Services/LoginContext';
import { fetchData, loginUsuario } from '../Services/apiService';
import styles from '../assets/css/TelaLogin2.module.css';


function TelaLogin2() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { setIsLoggedIn, setLoggedUser } = useContext(LoginContext)
  function onSubmit(event) {
    event.preventDefault();
    const data = { email: event.target.email.value, password: event.target.password.value }
    loginUsuario(data).then((_) => {
      if (_ === true) {
        fetchData("/auth/me").then((user) => {
          setLoggedUser(user)
          sessionStorage.setItem("loggedUser", JSON.stringify(user))
          navigate("/profile")
        }, (error) => {
          console.log("Erro ao buscar quem logou")
          console.log(error)
        })
      } else {
        setIsLoggedIn(false)
        setLoggedUser(null)
        sessionStorage.removeItem('loggedUser');
      }
    }, (_) => { console.log(_) })
  }

  function toggleVisible() {
    setVisible(!visible);
  }

  return (
    <div className={styles.login}>
      <form  onSubmit={onSubmit}>
        <div className={styles.inputs}>

          <h1 className={styles.Login}>Entrar</h1>
          <p className={styles.subtext}>Insira seu email e senha para continuar!</p>
          <button className={styles.google__login} type="button">
            <img src="/images/Google__G__Logo 1.png" alt="imagem_google"></img>Entrar com Google
          </button>
          <div className={styles.inputs_principal}>
            <label for="email">E-mail*</label>
            <input type="email" name="email" id="email" placeholder="mail@simmmple.com"></input>
            <label for="senha">Senha*</label>
            <div className={styles.password}>
              <input type={visible ? "text" : "password"} name="password" id="senha" placeholder="Min. 8 characters"></input>
              <img src="/images/visibility.svg" onClick={toggleVisible} id="btn_senha"></img>
            </div>
          </div>
          <div className={styles.mant_log}>
            <div className={styles.chekbox}>
              <input type="checkbox"></input> <label for="mante">Mantenha logado</label>
            </div>
            <div className={styles.link}>
              <a href="/Email_esq.html">Esqueceu sua senha?</a>
            </div>
          </div>
          <button className={styles.login_but}>Entrar</button>
          <p>Não possui conta?<a href="/new_conta.html" className="criar_conta">Crie uma conta agora.</a></p>
        </div>
      </form>

      <div className={styles.img_logo}>
        <figcaption>
          <img src="/images/Image.png" alt=""></img>
        </figcaption>
      </div>
    </div >
  );
}

export default TelaLogin2;
