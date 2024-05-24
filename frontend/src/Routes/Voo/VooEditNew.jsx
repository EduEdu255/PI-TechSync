import { useCallback, useEffect, useState } from "react";
import { Input } from "../../components/Input";
import { FormProvider, useForm } from "react-hook-form";
import {
  editData,
  fetchData,
  fetchItemData,
  postData,
} from "../../Services/apiService";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import InputError from "../../components/InputError";
import Loading from "../../components/Loading";
import SelectAeroporto from "../../components/SelectAeroporto";

function CadastroVoo() {
  const navigate = useNavigate();
  const [voo, setVoo] = useState(null);
  const [aeronaves, setAeronaves] = useState([]);
  const { id } = useParams();
  const methods = useForm();

  const handleFormSubmit = (data) => {
    setProcessando(true);
    let request = undefined
    if (voo) {
      request = editData("/voo", data, voo.id);
    } else {
        request = postData("/voo", data);
    }
    setProcessando(true);
    request.then(
      () => {
        setProcessando(false);
        navigate("/voo");
      },
      (err) => {
        setProcessando(false);
        console.log(err);
      }
    );
  };
  const [erros, setErros] = useState(null);
  const [processando, setProcessando] = useState(false);

  const getVoo = useCallback(
    (id) => {
      if (id) {
        setProcessando(true);
        fetchItemData("voo", id).then(
          (_) => {
            setVoo(_);
            const valor = parseFloat(_.valor);
            methods.setValue("numero", _.numero);
            methods.setValue("aeronave", _.aeronave.sigla);
            methods.setValue("cod_origem", _.origem);
            methods.setValue("cod_destino", _.destino);
            methods.setValue("hora_saida", _.saida);
            methods.setValue("hora_chegada", _.chegada);

            methods.setValue("valor", valor);
            setProcessando(false);
          },
          (err) => {
            console.log(err);
            setProcessando(false);
          }
        );
      }
    },
    [methods]
  );
  useEffect(() => {
    fetchData("aeronave").then(
      (_) => {
        setAeronaves(_.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  useEffect(() => {
    if (id && methods && methods.setValue) {
      getVoo(id);
    }
  }, [getVoo, id, methods]);
  function mapAeronave(aeronave) {
    return <option value={aeronave.sigla}>{aeronave.marca}</option>;
  }
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

          <div className="w-[50%]">
            <form
              onSubmit={(e) => e.preventDefault()}
              noValidate
              autoComplete="off"
              className="flex  justify-center items-center flex-col m-auto px-5"
            >
              <div className=" py-7">
                <h1 className="text-[#2B3674] text-4xl ">
                  {voo ? "Atualizar" : "Cadastrar"} Vôo
                </h1>
              </div>
              <div className="flex  flex-col gap-3 ">
                <Input
                  label="Número*"
                  type="number"
                  id="numbero"
                  placeholder="2000"
                  name="numero"
                  validation={{
                    required: { value: true, message: "Campo Obrigatório" },
                  }}
                />
                <SelectAeroporto
                  label="Origem*"
                  id="cod_origem"
                  name="cod_origem"
                  addedValidation={{
                    validate: (v) =>
                      v !== methods.getValues("cod_destino") ||
                      "Origem deve ser diferente do Destino",
                  }}
                />
                <SelectAeroporto
                  label="Destino*"
                  id="cod_destino"
                  name="cod_destino"
                  addedValidation={{
                    validate: (v) =>
                      v !== methods.getValues("cod_origem") ||
                      "Destino deve ser diferente da Origem",
                  }}
                />
                <Input
                  label="Hora de Saída*"
                  type="text"
                  id="hora_saida"
                  placeholder="12:00"
                  name="hora_saida"
                  validation={{
                    required: { value: true, message: "Campo Obrigatório" },
                  }}
                />
                <Input
                  label="Hora de Chegada*"
                  type="text"
                  id="hora_chegada"
                  placeholder="12:00"
                  name="hora_chegada"
                  validation={{
                    required: { value: true, message: "Campo Obrigatório" },
                  }}
                />
                <Input
                  label="Valor*"
                  type="number"
                  id="valor"
                  placeholder="250.65"
                  name="valor"
                  step="0.01"
                  validation={{
                    required: { value: true, message: "Campo Obrigatório" },
                  }}
                />
                <label
                  htmlFor="aeronave"
                  className="text-[#2B3674] font-medium"
                >
                  Aeronave
                </label>
                <select
                  name="aeronave"
                  className="border flex items-center justify-between h-14 rounded-2xl w-full px-5"
                  id="aeronave"
                  defaultValue="Selecione uma Aeronave"
                  {...methods.register("aeronave", {
                    required: { value: true, message: "Campo Obrigatório" },
                  })}
                >
                  <option></option>
                  {aeronaves.length > 0 && aeronaves.map(mapAeronave)}
                </select>

                <button
                  onClick={methods.handleSubmit(handleFormSubmit)}
                  className="flex w-full bg-[#3758D0] h-14 gap-2 rounded-2xl  items-center text-gray-50 font-semibold justify-center"
                >
                  {voo ? "Atualizar" : "Cadastrar"}
                </button>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                {erros && (
                  <InputError message={erros.message} key={erros.message} />
                )}
              </AnimatePresence>
            </form>
          </div>
          <div className="w-[50%] flex justify-center items-center  bg-[url(/images/cia-registrar.jpg)] bg-cover bg-no-repeat rounded-bl-[150px] rounded-tl-[15px]">
            <img src="/images/logo-Pousar.png"></img>
          </div>
        </FormProvider>
      </motion.div>
    </AnimatePresence>
  );
}

export default CadastroVoo;
