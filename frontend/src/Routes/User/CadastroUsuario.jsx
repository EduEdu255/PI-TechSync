import { useState } from "react";
import { Input } from "../../components/Input";
import { InputPassword } from "../../components/InputPassword";
import { FormProvider, useForm } from "react-hook-form";
import { postData } from "../../Services/apiService";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import InputError from "../../components/InputError";
import Loading from "../../components/Loading";

function CadastroUsuario() {
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
        className="flex justify-between gap-5 h-screen"
      >
        <FormProvider {...methods}>
          {processando ? <Loading /> : null}
          <div className="w-[50%] flex justify-center items-center  bg-[url(/images/LoginIMG.jpg)] bg-cover bg-no-repeat rounded-br-[150px]">
            <img src="/images/logo-Pousar.png"></img>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            noValidate
            autoComplete="off"
            className="flex  justify-center items-center flex-col w-[50%]  px-5"
          >
            <div className="flex flex-col gap-2">

            <div className=" py-7">
              <h1 className="text-[#2B3674] text-4xl ">Registre sua conta</h1>
            </div>
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
                    required: { value: true, message: "Campo Obrigatório" },
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
              <div className="flex justify-between">

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
              </div>
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
              <div className="flex  justify-between items-end">
                  <Input
                    label="Município"
                    type="text"
                    id="municipio"
                    placeholder="Juazeiro do Norte"
                    name="municipio"
                  />
                  <div className="w-[50%] h">
                    <h2 className="text-[#2B3674] font-semibold ">UF</h2>
                    <select
                      name="uf"
                      id="uf"
                      className="border flex items-center justify-between h-14 px-5 rounded-2xl  "
                    >
                      
                      <option value="AC">Acre</option>
                      <option value="AL">Alagoas</option>
                      <option value="AP">Amapá</option>
                      <option value="AM">Amazonas</option>
                      <option value="BA">Bahia</option>
                      <option value="CE">Ceará</option>
                      <option value="DF">Distrito Federal</option>
                      <option value="ES">Espírito Santo</option>
                      <option value="GO">Goiás</option>
                      <option value="MA">Maranhão</option>
                      <option value="MT">Mato Grosso</option>
                      <option value="MS">Mato Grosso do Sul</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="PA">Pará</option>
                      <option value="PB">Paraíba</option>
                      <option value="PR">Paraná</option>
                      <option value="PE">Pernambuco</option>
                      <option value="PI">Piauí</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="RN">Rio Grande do Norte</option>
                      <option value="RS">Rio Grande do Sul</option>
                      <option value="RO">Rondônia</option>
                      <option value="RR">Roraima</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="SP">São Paulo</option>
                      <option value="SE">Sergipe</option>
                      <option value="TO">Tocantins</option>
                      <option value="EX">Estrangeiro</option>
                    </select>
                  </div>
                </div>
            <p>
              Já possui conta??{" "}
              <Link to="/login" className="text-[#3758D0] font-semibold">
                Fazer Login
              </Link>
            </p>
            <div className="mt-5">
              <button
                onClick={methods.handleSubmit(handleFormSubmit)}
                className="flex w-[100%] bg-[#3758D0] h-14 gap-2 rounded-2xl   items-center text-gray-50 font-semibold justify-center"
              >
                Cadastrar
              </button>
              </div>
            <AnimatePresence mode="wait" initial={false}>
              {erros && (
                <InputError message={erros.message} key={erros.message} />
              )}
            </AnimatePresence>
            </div>
          </form>
        </FormProvider>
      </motion.div>
    </AnimatePresence>
  );
}

export default CadastroUsuario;
