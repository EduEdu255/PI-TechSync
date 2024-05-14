import * as zod from "zod";
import { loginUsuario } from "../Services/apiService";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

const loginFormValidationSchema = zod.object({
    email: zod.string().min(1, "E-mail obrigatório"),
    password: zod.string().min(1, "Senha obrigatória"),
  });
  
  


export function LoginTeste() {
   
    const navigate = useNavigate();
  
    
    // Evento para enviar os parametros e conferir se está de acordo com o banco
    const handleSubmit = (event) => {
        event.preventDefault();
        //As cons mostram os valores que o 
        const email = (event.target.email.value) // from elements property
        const password = (event.target.password.value)
        loginUsuario({
            email: email,
            password:password 
        }).then(() => {
            navigate("/me")

        },console.log)          
      }

      return (
       
        <form onSubmit={handleSubmit}>
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button>Login</button>
      </form>
      
        
      );
    }
    
