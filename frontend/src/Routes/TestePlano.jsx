import { useEffect, useState } from "react";
import { fetchData, loginUsuario } from "../Services/apiService";
import Loading from '../components/Loading';
import Plano from '../components/Plano';

function TesteFetchComponent() {
  const [dados, setDados] = useState(null);

  async function fetch() {
    try {
      const result = await fetchData("plano");
      setDados(result);
    } catch (error) {
      setDados({data:[]});
      console.log(error);
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="p-10">
      {dados ? <div className="flex flex-col sm:flex-row items-center justify-center flex-wrap gap-10">{dados.data.map(renderPlano)}</div> : <Loading/>}
    </div>
  );
}

function renderPlano(plano) {
  return <Plano dado={plano}/>
  
}

export default TesteFetchComponent;
