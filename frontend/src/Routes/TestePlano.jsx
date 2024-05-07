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
    <div>
      {data ? <div>{data.data.map(renderPlano)}</div> : <p>loading...</p>}
    </div>
  );
}

function renderPlano(plano) {
  return (
    <div>
      <h3 className="text-3xl font-bold underline">{plano.nome}</h3>
      <ul>
        <li className="text-blue-600">ID: {plano.id}</li>
        <li>Valor: {plano.valor}</li>
        <li>Quantidade Meses: {plano.meses_validade}</li>
      </ul>
    </div>
  );
}

export default TesteFetchComponent;
