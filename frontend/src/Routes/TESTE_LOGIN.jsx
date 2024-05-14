export function Login() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
  
    const methods = useForm({
      resolver: zodResolver(loginFormValidationSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });
  
    async function handleLogin(data: loginFormData) {
      const { email, password } = data;
  
      if (email && password) {
        const isLogged = await auth.signin(email, password);
  
        if (isLogged) {
          navigate("/user/nav");
        } else {
          alert("Dados incorretos!");
        }
      }
    }
}