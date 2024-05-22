import { useFormContext } from "react-hook-form";
import { AnimatePresence } from "framer-motion";
import { findInputError } from "../utils/findInputError";
import { isFormInvalid } from "../utils/isFormValid";
import InputError from "./InputError";
import { useState } from 'react';

export const InputPassword = ({ label, id, placeholder, validation, name }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  function toggleVisible() {
    setVisible(!visible);
  }
  const [visible, setVisible] = useState(false);
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
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          {...register(name, validation)}
          className="w-full h-full rounded-2xl px-5"
        />
        <img
          src={
            visible ? "/images/visibility-off.svg" : "/images/visibility.svg"
          }
          className="opacity-60"
          onClick={toggleVisible}
          id="visibility_senha"
        ></img>
      </div>
    </div>
  );
};
