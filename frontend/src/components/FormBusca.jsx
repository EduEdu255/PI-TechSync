import { FormProvider, useForm } from "react-hook-form";
import { Input } from "./Input";
import SelectAeroporto from "./SelectAeroporto";
import { useState } from 'react';
// import { AnimatePresence } from 'framer-motion';
import InputError from './InputError';




const FormBusca = ({ onSubmit }) => {
  const handleFormSubmit = (data) => {
    if (data.origem == data.destino) {
      setErros({ message: "Aeroporto de Origem e Destino devem ser diferentes" })
      return null;
    } else if (data.volta && Date.parse(data.ida) >= Date.parse(data.volta)) {
      setErros({message: "Volta não pode ser antes da Ida"})
      return null;
    }
    else {
      setErros(null);
    }
    onSubmit(data);
  };

  const [erros, setErros] = useState(null);

  const methods = useForm();
  return (
    <div className=" w-5/6  m-auto">
      <h3 className="text-3xl text-center mb-7">Busca de Passagens</h3>
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => e.preventDefault()}
          noValidate
          autoComplete="off"
          className="container"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <SelectAeroporto
              name="origem"
              id="origem"
              label="Selecione um Aeroporto de Origem"
            />
            <SelectAeroporto
              name="destino"
              id="destino"
              label="Selecione um Aeroporto de Destino"
            />
            <Input
              label="Data de Ida"
              type="date"
              id="ida"
              placeholder="03/06/2024"
              name="ida"
              validation={{
                required: { value: true, message: "Campo obrigatório" },
              }}
            />
            <Input
              label="Data de Volta"
              type="date"
              id="volta"
              placeholder="09/06/2024"
              name="volta"
            />
          </div>
          <AnimatePresence mode="wait" initial={false}>
            {erros && (
              <InputError
                message={erros.message}
                key={erros.message}
              />
            )}
          </AnimatePresence>
          <div className="mt-5">
            <button
              onClick={methods.handleSubmit(handleFormSubmit)}
              className="flex items-center gap-1 p-5 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-800"
            >
              Buscar
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormBusca;
