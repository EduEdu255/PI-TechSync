import { useCallback, useEffect, useState } from "react";
import { Input } from "../../components/Input";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { editData, fetchData, fetchItemData, postData } from "../../Services/apiService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import InputError from "../../components/InputError";
import Loading from "../../components/Loading";


function CadastroAeronave() {
  const navigate = useNavigate();
  const [aeronave, setAeronave] = useState(null);
  const { id } = useParams();
  const methods = useForm();

  const handleFormSubmit = (data) => {
    setProcessando(true);
    let request = postData("/aeronave", data)
    if(aeronave){
       request = editData("/aeronave", data, aeronave.id)
    }
    setProcessando(true)
   request.then(
      () => {
        setProcessando(false);
        navigate("/aeronave");
      },
      (err) => {
        setProcessando(false);
        console.log(err);
      }
    );
  };
  const [erros, setErros] = useState(null);
  const [processando, setProcessando] = useState(false);

  const getAeronave = useCallback((id) => {
    if (id) {
      setProcessando(true)
      fetchItemData("aeronave", id).then((_) => {
        setAeronave(_)
        methods.setValue('sigla', _.sigla)
        methods.setValue('id', _.id)
        methods.setValue('marca', _.marca)
        methods.setValue('qte_assentos', _.quantidadeAssentos)
        setProcessando(false)
      }, (err) => {
        console.log(err)
        setProcessando(false)
      })
    }
  }, id);

  useEffect(() => {
    if (id && methods && methods.setValue
      ) {
      getAeronave(id)
    }
  }, [getAeronave, id]);

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
                <h1 className="text-[#2B3674] text-4xl ">{aeronave ? "Atualizar" : "Cadastrar"} Aeronave</h1>
              </div>
              <div className="flex  flex-col gap-3 ">
                <Input type="hidden" name='id'></Input>
                <Input
                  label="Sigla*"
                  type="text"
                  id="sigla"
                  placeholder="320"
                  name="sigla"
                  value={aeronave?.sigla}
                  validation={{
                    required: { value: true, message: "Campo Obrigatório" },
                    maxLenght: { value: 3, message: "Limite de 3 caracteres" }
                  }}
                />
                <Input
                  label="Nome*"
                  type="text"
                  id="marca"
                  placeholder="Airbus A320"
                  name="marca"
                  validation={{
                    required: { value: true, message: "Campo Obrigatório" },
                  }}
                />
                <Input
                  label="Quantidade de Assentos*"
                  type="number"
                  id="qte_assentos"
                  placeholder="150"
                  name="qte_assentos"
                  validation={{
                    required: { value: true, message: "Campo Obrigatório" },
                  }}
                />
                <button
                  onClick={methods.handleSubmit(handleFormSubmit)}
                  className="flex w-full bg-[#3758D0] h-14 gap-2 rounded-2xl  items-center text-gray-50 font-semibold justify-center"
                >
                  {
                    aeronave ? "Atualizar" : "Cadastrar"
                  }
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

export default CadastroAeronave;
