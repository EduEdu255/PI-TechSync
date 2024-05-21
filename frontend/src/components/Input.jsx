import { useFormContext } from "react-hook-form";
import { AnimatePresence } from "framer-motion";
import { findInputError } from '../utils/findInputError';
import { isFormInvalid } from '../utils/isFormValid';
import InputError from './InputError';

export const Input = ({ label, type, id, placeholder, validation, name }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputError = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputError);


  return (
    <div>
      <div>
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
      <div className="border flex items-center justify-between h-14 rounded-2xl w-full">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
          className="w-full h-full rounded-2xl px-5"
        />
      </div>
    </div>
  );
};
