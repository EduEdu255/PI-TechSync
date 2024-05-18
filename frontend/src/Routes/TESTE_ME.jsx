import { useEffect, useState } from "react";
import { fetchData, loginUsuario } from "../Services/apiService";


export function TesteMe() {

  //Sempre usar para atulizar dados recebidos do back-end na página
  const [data, setData] = useState(null);

  // Function para conectar ao back end
  async function fetch() {
    try {
      //fetch data busca informaç~eos no back-end
      const result = await fetchData("auth/me");
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
      {data ? <div className="flex flex-col sm:flex-row items-center justify-center flex-wrap gap-10">
      <p>Nome:{data.nome}</p>
      <p>Email:{data.email}</p>
      </div> : <p>loading...</p>}
    </div>
  );
}


    
    
