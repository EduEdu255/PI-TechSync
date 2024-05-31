import { FormProvider, useForm } from "react-hook-form";
import { Input } from "./Input";
import SelectAeroporto from "./SelectAeroporto";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import InputError from "./InputError";

const FormBusca = ({ onSubmit }) => {
  const handleFormSubmit = (data) => {
    if (data.origem == data.destino) {
      setErros({
        message: "Aeroporto de Origem e Destino devem ser diferentes",
      });
      return null;
    } else if (data.volta && Date.parse(data.ida) >= Date.parse(data.volta)) {
      setErros({ message: "Volta não pode ser antes da Ida" });
      return null;
    }
    else if (Date.parse(data.ida + " 00:00:00") < new Date().setHours(0, 0, 0, 0)) {
      setErros({ message: "Data de ida não pode ser no passado" })
      return null;

    } else {
      setErros(null);
    }
    onSubmit(data);
  };

  const [erros, setErros] = useState(null);

  const methods = useForm();
  return (
    <div className=" w-[90%] ml-auto mr-auto top-16 relative shadow-lg p-10 rounded-3xl bg-white font-[Rubik]">
      <h3 className="mb-7 font-medium text-2xl">Busca de Passagens</h3>
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => e.preventDefault()}
          noValidate
          autoComplete="off"
        >
          <div className="flex items-start gap-5">
            <SelectAeroporto
              name="origem"
              id="origem"
              label="Origem"
              addedValidation={{
                validate: (v) =>
                  v !== methods.getValues("destino") ||
                  "Origem deve ser diferente do Destino",
              }}
            />
            <SelectAeroporto
              name="destino"
              id="destino"
              label="Destino"
              addedValidation={{
                validate: (v) =>
                  v !== methods.getValues("origem") ||
                  "Destino deve ser diferente da Origem",
              }}
            />
            <Input
              label="Ida"
              type="date"
              id="ida"
              placeholder="03/06/2024"
              name="ida"
              validation={{
                required: { value: true, message: "Campo obrigatório" },
              }}
            />
            <Input
              label="Volta"
              type="date"
              id="volta"
              placeholder="09/06/2024"
              name="volta"
            />

            <button
              onClick={methods.handleSubmit(handleFormSubmit)}
              className="flex px-8 py-2 bg-[#3758D0] h-14 gap-2 rounded-full my-6 items-center text-[#CAD7FF] font-semibold text-xl justify-center"
            >
              Procurar
            </button>
          </div>
        </form>
        <AnimatePresence mode="wait" initial={false}>
          {erros && <InputError message={erros.message} key={erros.message} />}
        </AnimatePresence>
      </FormProvider>
    </div>
  );
};

export default FormBusca;
