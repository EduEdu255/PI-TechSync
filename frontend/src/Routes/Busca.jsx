import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { postData } from "../Services/apiService";
import aeroportos from "../Services/aeroportos";
import Passagem from "../components/Passagem";
import FormBusca from "../components/FormBusca";
import Loading from '../components/Loading';

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
      submitBusca(data);
    }
  }, [data]);

  function findAeroporto(iata) {
    const found = aeroportos.find((i) => i.iata == iata);
    return found;
  }

  function submitBusca(data) {
    if (data.volta == "") {
      delete data.volta;
    }
    setResult(null);
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

  useEffect(() => {
    getDataFromLocation();
    getBuscasApi();
  }, [getDataFromLocation, getBuscasApi]);

  return (
    <div>
      <FormBusca onSubmit={submitBusca} />
      <div>{result ? parseResult(result) : <Loading/>}</div>
    </div>
  );

  function parseResult(data) {
    if (data.length == 0) {
      return "Sem dados";
    }
    const dados = data.data;
    const quantidade = dados.quantidade;
    const passagens = dados.passagens;
    const origem = findAeroporto(dados.origem);
    const destino = findAeroporto(dados.destino);
    return (
      <>
        <div className=' w-3/4 m-auto'>
          <p>Quantidade: {quantidade}</p>
          <p>
            Origem: {origem.name} - {origem.iata}
          </p>
          <p>
            Destino: {destino.name} - {destino.iata}
          </p>
          <p>Ida: {getDate(dados.ida + " 00:00:00")}</p>
          {dados.volta ? <p>Volta: {getDate(dados.volta + " 00:00:00")}</p> : null}
          <p>Passagens: {passagens.map((x) => {
            return mapPassagem(x, dados.id);

          })}</p>
        </div>
      </>
    );
  }
   function getDate(date) {
     const data = new Date(Date.parse(date));
     if (!(data instanceof Date)) {
       return "";
     }
     return data.toLocaleDateString("pt-BR", {
       year: "numeric",
       month: "2-digit",
       day: "2-digit",
     });
   }

  function mapPassagem(passagem, id) {
    return (
      <Passagem
        id={id}
        origem={findAeroporto(passagem.origem)}
        destino={findAeroporto(passagem.destino)}
        cia={passagem.ciaAerea}
        preco={passagem.preco}
        ida={passagem.ida}
        volta={passagem.volta ? passagem.volta : null}
        link={passagem.linkBusca}
        logo = {passagem.cia.logo}
      />
    );
  }
}
export default Busca;
