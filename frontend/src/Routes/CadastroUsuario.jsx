import { useState } from "react";
import { Input } from "../components/Input";
import { FormProvider, useForm } from "react-hook-form";
import { postData } from "../Services/apiService";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import InputError from "../components/InputError";



function CadastroUsuario() {
    const navigate = useNavigate();
    const handleFormSubmit = (data) => {
        if (data.password !== data.password_repeat) {
            setErros({ message: "As senhas devem ser iguais" })
            return null;
        } 
        else {
            setErros(null);
        }
        postData("/auth/register", data).then(() => {
            navigate("/login");
        }, (err) => {console.log(err)})        
    };
    const [erros, setErros] = useState(null);

    const methods = useForm();

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={(e) => e.preventDefault()}
                    noValidate
                    autoComplete="off"
                    className="container"
                >
                    <div className="flex flex-col gap-5">
                        <Input
                            label="Nome Completo"
                            type="text"
                            id="nome"
                            placeholder="Nome Completo"
                            name="nome"
                            validation={{
                                required: { value: true, message: "Campo Obrigatório" }
                            }}
                        />
                        <Input
                            label="email"
                            type="email"
                            id="email"
                            placeholder="example@email.com"
                            name="email"
                            validation={{
                                required: { value: true, message: "Campo Obrigatório" }
                            }}
                        />

                        <Input
                            label="Senha"
                            type="password"
                            id="password"
                            placeholder="Mínimo de 8 caracteres"
                            name="password"
                            validation={{
                                required: { value: true, message: "Campo Obrigatório" },
                                minLength: { value: 8, message: "Senha deve ter no mínimo 8 caracteres" }
                            }}
                        />

                        <Input
                            label="Repita a Senha"
                            type="password"
                            id="password_repeat"
                            placeholder="Repita a Senha"
                            name="password_repeat"
                            validation={{
                                required: { value: true, message: "Campo Obrigatório" },
                                min: { value: 8, message: "Senha deve ter no mínimo 8 caracteres" }
                            }}
                        />
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
                            />
                        <div className="flex">


                            <Input
                                label="Logradouro"
                                type="text"
                                id="logradouro"
                                placeholder="Rua ..."
                                name="logradouro"
                            />

                            <Input
                                label="Número"
                                type="text"
                                id="numero"
                                placeholder="123"
                                name="numero"
                            />
                            <Input
                                label="Complemento"
                                type="text"
                                id="complemento"
                                placeholder="Ap. 201"
                                name="complemento"
                            />
                            <Input
                                label="Município"
                                type="text"
                                id="municipio"
                                placeholder="Juazeiro do Norte"
                                name="municipio"
                            />
                        </div>
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
                            Cadastrar
                        </button>
                    </div>
                </form>
            </FormProvider>
        </>
    )

}

export default CadastroUsuario;