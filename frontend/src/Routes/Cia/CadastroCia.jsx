import { useState } from "react";
import { Input } from "../../components/Input";
import { InputPassword } from "../../components/InputPassword";
import { FormProvider, useForm } from "react-hook-form";
import { postData } from "../../Services/apiService";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import InputError from "../../components/InputError";
import Loading from "../../components/Loading";

function CadastroCia() {
  const navigate = useNavigate();

  const handleFormSubmit = (data) => {
    if (!data.password || !data.password_repeat) {
      setErros({ message: "Senha e Repetir Senha são campos obrigatórios" });
      return null;
    }
    if (data.password !== data.password_repeat) {
      setErros({ message: "As senhas devem ser iguais" });
      return null;
    } else {
      setErros(null);
    }
    setProcessando(true);
    postData("/cia_aerea", data).then(
      () => {
        setProcessando(false);
        navigate("/cia/login");
      },
      (err) => {
        setProcessando(false);
        console.log(err);
      }
    );
  };
  const [erros, setErros] = useState(null);
  const [processando, setProcessando] = useState(false);

  const methods = useForm();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex justify-between  gap-5 h-screen"
      >
        <FormProvider {...methods}>
          {processando ? <Loading /> : null}


          <form
            onSubmit={(e) => e.preventDefault()}
            noValidate
            autoComplete="off"
            className="flex  justify-center items-center flex-col w-[50%]  px-5"
          >
            <div className=" py-7">
              <h1 className="text-[#2B3674] text-4xl ">Registre sua conta empresarial</h1>
            </div>
            <div className="flex  flex-col gap-3 ">
              <div className="flex  w-full justify-between">

              <Input
                label="Razão Social*"
                type="text"
                id="razao_social"
                placeholder="Razão Social"
                name="razao_social"
                validation={{
                  required: { value: true, message: "Campo Obrigatório" },
                }}
              />
              <Input
                label="CNPJ*"
                type="text"
                id="cnpj"
                placeholder="12345678000132"
                name="cnpj"
                validation={{
                  required: { value: true, message: "Campo Obrigatório" },
                }}
              />
              </div>
              <Input
                label="Login*"
                type="text"
                id="login"
                placeholder="Crie um login"
                name="login"
                validation={{
                  required: { value: true, message: "Campo Obrigatório" },
                }}
              />
              <Input
                label="Código IATA*"
                type="text"
                id="codigo_iata"
                placeholder="Seu código IATA"
                name="codigo_iata"
                validation={{
                  required: { value: true, message: "Campo Obrigatório" },
                  maxLenght: {
                    value: 2,
                    message: "Não pode ser maior que 2 caracteres",
                  },
                }}
              />
              <div className="flex gap-5 w-full justify-between items-center">
                <InputPassword
                  id="password"
                  label="Senha*"
                  placeholder="Mínimo de 8 caracteres"
                  name="password"
                  validation={{
                    required: { value: true, message: "Campo Obrigatório" },
                    minLength: {
                      value: 8,
                      message: "Mínimo de 8 caracteres",
                    },
                  }}
                />

                <InputPassword
                  label="Repita a senha*"
                  id="password_repeat"
                  placeholder="Repita a Senha"
                  name="password_repeat"
                  validation={{
                    required: {
                      value: true,
                      message: "Campo Obrigatório",
                    },
                    minLength: {
                      value: 8,
                      message: "Mínimo de 8 caracteres",
                    },
                    validate: {
                      repeat: (v) =>
                        v == methods.getValues("password") ||
                        "Senhas devem ser iguais",
                    },
                  }}
                />
              </div>
              <Input
                label="Email"
                type="email"
                id="email"
                placeholder="contato@ciaarea.com"
                name="email"
              />
              <div className="flex justify-between items-center">

                <Input
                  label="Telefone"
                  type="text"
                  id="telefone"
                  placeholder="+55 88 987654321"
                  name="telefone"
                />
                <Input
                  label="URL para reservas"
                  type="url"
                  id="url"
                  placeholder="https://www.ciaarea.com.br"
                  name="url"
                />
              </div>
            
              <p className="my-5">
                Já possui conta??{" "}
                <Link to="/cia/login" className="text-[#3758D0] mt-5 font-semibold">
                  Fazer Login
                </Link>
              </p>
            
              <button
                onClick={methods.handleSubmit(handleFormSubmit)}
                className="flex w-full bg-[#3758D0] h-14 gap-2 rounded-2xl  items-center text-gray-50 font-semibold justify-center"
              >
                Cadastrar
              </button>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              {erros && (
                <InputError message={erros.message} key={erros.message} />
              )}
            </AnimatePresence>
            
          
          </form>
          <div className="w-[50%] flex justify-center items-center  bg-[url(/images/cia-registrar.jpg)] bg-cover bg-no-repeat rounded-bl-[150px] rounded-tl-[15px]">
            <img src="/images/logo-Pousar.png"></img>
          </div>
        </FormProvider>
      </motion.div>
    </AnimatePresence>
  );
}

export default CadastroCia;
