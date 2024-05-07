import { useEffect, useState } from "react";
import { fetchData, loginUsuario } from "../Services/apiService";

function TesteFetchComponent() {
  const [data, setData] = useState(null);

  async function fetch() {
    try {
      const result = await fetchData("plano");
      setData(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="p-10">
      {data ? <div className="flex flex-col sm:flex-row items-center justify-center flex-wrap gap-10">{data.data.map(renderPlano)}</div> : <p>loading...</p>}
    </div>
  );
}

function renderPlano(plano) {
  return (
    <div className="w-full sm:w-1/5 p-12 rounded-lg bg-indigo-300 shadow hover:bg-sky-700 transition-colors duration-1000 ease-in-out">
      <h3 className="font-bold text-center lg:text-3xl">{plano.nome}</h3>
      <ul className="text-center">
        <li>R$ <span className="lg:text-3xl text-red-600">{plano.valor}</span></li>
        <li>válido por <span className="text-2xl">{plano.meses_validade}</span> {plano.meses_validade > 1 ? 'meses' : 'mês'}</li>
      </ul>
    </div>
  );
}

export default TesteFetchComponent;
