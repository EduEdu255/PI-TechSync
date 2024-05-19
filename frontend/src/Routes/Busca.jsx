import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { postData } from "../Services/apiService";
import aeroportos from "../Services/aeroportos";

function Busca() {
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const location = useLocation();

  const getDataFromLocation = useCallback(() => {
    if (location.state) {
      setData(location.state);
    }
  }, [location.state]);

  const getBuscasApi = useCallback(() => {
    if (data) {
      if (data.volta == "") {
        delete data.volta;
      }
      postData("busca", data).then(
        (_) => {
          setResult(_);
        },
        (_) => {
          console.log(_);
          setResult([]);
        }
      );
    }
  }, [data]);
    
    function findAeroporto(iata) {
        const found = aeroportos.find((i) => i.iata == iata);
        return found;
}

  useEffect(() => {
    getDataFromLocation();
    getBuscasApi();
  }, [getDataFromLocation, getBuscasApi]);

  return (
    <div>
      <h1>{result ? parseResult(result) : "loading..."}</h1>
    </div>
    );
    
    function parseResult(data) {
        if (data.length == 0) {
            return "Sem dados"
        }
        const dados = data.data;
        const quantidade = dados.quantidade;
        const passagens = dados.passagens;
        const origem = findAeroporto(dados.origem);
        const destino = findAeroporto(dados.destino);
        return (
            <>
                <p>Quantidade: { quantidade}</p>
                <p>Origem: { origem.name}</p>
                <p>Destino: {destino.name}</p>
                <p>Dados Passagens: {JSON.stringify(passagens)}</p>
            </>
        )

    }
}
export default Busca;
