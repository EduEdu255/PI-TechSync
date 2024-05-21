import { useState } from "react";
import { Input } from "../components/Input";
import { FormProvider, useForm } from "react-hook-form";
import { postData } from "../Services/apiService";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import InputError from "../components/InputError";
import Loading from "../components/Loading";

function CadastroUsuario() {
  const navigate = useNavigate();

    const handleFormSubmit = (data) => {
        if (!data.password || !data.password_repeat) {
            setErros({message: "Senha e Repetir Senha são campos obrigatórios"})
            return null;
      }
    if (data.password !== data.password_repeat) {
      setErros({ message: "As senhas devem ser iguais" });
      return null;
    } else {
      setErros(null);
    }
    setProcessando(true);
    postData("/auth/register", data).then(
      () => {
        setProcessando(false);
        navigate("/login");
      },
      (err) => {
        setProcessando(false);
        console.log(err);
      }
    );
  };
  const [visible, setVisible] = useState(false);
  const [erros, setErros] = useState(null);
  const [processando, setProcessando] = useState(false);

  const methods = useForm();
  function toggleVisible() {
    setVisible(!visible);
  }
  return (
    <>
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex justify-between gap-5 overflow-hidden h-screen"
      >
        <FormProvider {...methods}>
          <div className="w-[50%] h-[100%] flex justify-center items-center  bg-[url(/images/LoginIMG.jpg)] bg-cover bg-no-repeat">
            {processando ? <Loading /> : null}
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            noValidate
            autoComplete="off"
            className=" w-3/6 px-5"
          >
            <div className="flex flex-col gap-5">
              <Input
                label="Nome Completo*"
                type="text"
                id="nome"
                placeholder="Nome Completo"
                name="nome"
                validation={{
                  required: { value: true, message: "Campo Obrigatório" },
                }}
              />
              <Input
                label="Email*"
                type="email"
                id="email"
                placeholder="example@email.com"
                name="email"
                validation={{
                  required: { value: true, message: "Campo Obrigatório" },
                }}
              />
              <div className="flex gap-5 w-full justify-between items-center">
                <label
                  htmlFor="password"
                  className="text-[#2B3674] font-medium"
                >
                  Senha*
                </label>
                <div className="border flex items-center justify-between h-14 rounded-2xl">
                  <input
                    type={visible ? "text" : "password"}
                    id="password"
                    placeholder="Mínimo de 8 caracteres"
                    name="password"
                    className="w-full h-full rounded-2xl"
                  />

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
                <label
                  htmlFor="password_repeat"
                  className="text-[#2B3674] font-medium"
                >
                  Repita a Senha*
                </label>
                <div className="border flex items-center justify-between h-14 rounded-2xl">
                  <input
                    type={visible ? "text" : "password"}
                    id="password_repeat"
                    placeholder="Repita a Senha"
                    name="password_repeat"
                    className="w-full h-full rounded-2xl"
                  />
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
              <Input
                label="CPF"
                type="text"
                id="cpf"
                placeholder="123.456.789-21"
                name="cpf"
              />
              <Input
                label="Telefone"
                type="text"
                id="telefone"
                placeholder="+55 88 987654321"
                name="telefone"
                className="border flex items-center justify-between h-14 px-5 rounded-2xl"
              />
              <Input
                label="Logradouro"
                type="text"
                id="logradouro"
                placeholder="Rua ..."
                name="logradouro"
              />
              <div className="flex justify-between items-center gap-2 w-full">
                <Input
                  label="Número"
                  type="text"
                  id="numero"
                  placeholder="123"
                  name="numero"
                  className="border flex items-center justify-between h-14 px-5 rounded-2xl w-full"
                />
                <Input
                  label="Complemento"
                  type="text"
                  id="complemento"
                  placeholder="Ap. 201"
                  name="complemento"
                  className="border flex items-center justify-between h-14 px-5 rounded-2xl w-full"
                />
              </div>
              <Input
                label="Município"
                type="text"
                id="municipio"
                placeholder="Juazeiro do Norte"
                name="municipio"
              />
            </div>
            <AnimatePresence mode="wait" initial={false}>
              {erros && (
                <InputError message={erros.message} key={erros.message} />
              )}
            </AnimatePresence>
            <div className="mt-5">
              <button
                onClick={methods.handleSubmit(handleFormSubmit)}
                className="flex w-[100%] bg-[#3758D0] h-14 gap-2 rounded-2xl my-7 items-center text-gray-50 font-semibold justify-center"
              >
                Cadastrar
              </button>
            </div>
          </form>
        </FormProvider>
      </motion.div>
    </>
  );
}

export default CadastroUsuario;
