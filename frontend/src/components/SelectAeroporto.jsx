import { useFormContext } from "react-hook-form";
import aeroportos from "../Services/aeroportos";
import { findInputError } from "../utils/findInputError";
import { isFormInvalid } from "../utils/isFormValid";
import { AnimatePresence } from "framer-motion";
import InputError from './InputError';


function SelectAeroporto({ id, name, label, addedValidation }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputError = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputError);

  function getAeroporto(aeroporto) {
    return (
      <option value={aeroporto.iata} key={aeroporto.iata}>
        {aeroporto.name}
      </option>
    );
  }

  let validation = {
    required: { value: true, message: "Campo Obrigatório" },  
  };
  if (addedValidation) {
    validation = {...validation, ...addedValidation}
  }

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex flex-col justify-between">
        <div className="flex justify-between">
          <label htmlFor={id} className="text-[#2B3674] font-medium">
            {label}
          </label>
          <AnimatePresence mode="wait" initial={false}>
            {isInvalid && (
              <InputError
                message={inputError.error.message}
                key={inputError.error.message}
              />
            )}
          </AnimatePresence>
        </div>
        <select
          name={name}
          id={id}
          className="border flex items-center justify-between h-14 rounded-2xl w-full px-5"
          {...register(name, validation)}
          defaultValue=""
        >
          <option></option>
          {aeroportos.map(getAeroporto)}
        </select>
      </div>
    </div>
  );
}

export default SelectAeroporto;
