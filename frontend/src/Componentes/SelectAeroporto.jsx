import { useFormContext } from "react-hook-form";
import aeroportos from "../Services/aeroportos";
import { findInputError } from "../utils/findInputError";
import { isFormInvalid } from "../utils/isFormValid";
import { AnimatePresence } from "framer-motion";
import InputError from './InputError';


function SelectAeroporto({ id, name, label }) {
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
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex flex-col justify-between">
        <div className="flex justify-between">
          <label htmlFor={id} className="font-semibold capitalize">
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
          className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          {...register(name, {
            required: { value: true, message: "Campo Obrigatório" },
          })}
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