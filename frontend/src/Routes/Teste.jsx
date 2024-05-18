import { useNavigate } from "react-router-dom";

function TelaLogin() {
  const navigate = useNavigate();
  
  function onSubmit(event) {
    event.preventDefault();
    navigate("/TesteRota",{state:{message:"Mensagem Recebida"}})
  }

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Digite seu email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Senha:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Digite sua senha"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default TelaLogin;
