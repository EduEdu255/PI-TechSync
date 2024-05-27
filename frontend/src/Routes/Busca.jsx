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
  const [processando, setProcessando] = useState(false);
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
    setProcessando(true)
    postData("busca_local", data).then(
      (_) => {
        setProcessando(false)
        setResult(_);
      },
      (_) => {
        console.log(_);
        setProcessando(false)
        setResult([]);
      }
    );
  }

  useEffect(() => {
    getDataFromLocation();
    getBuscasApi();
  }, [getDataFromLocation, getBuscasApi]);

  return (
    <div className="bg-[#EEEEEE]">
      <div className='mb-24 flex items-end mb-36 bg-[url(/images/plane-view.png)] bg-cover h-[70vh]'>
      <FormBusca onSubmit={submitBusca} />
      </div>
      <div>{!processando ? result ? parseResult(result) : null : <Loading/>}</div>
    </div>
  );

  function parseResult(data) {
    if (data.length == 0) {
      return "Sem dados";
    }
    const dados = data.data;
    const quantidade = dados.quantidade;
    console.log(dados);
    const passagens = dados.passagens;
    const origem = findAeroporto(dados.origem);
    const destino = findAeroporto(dados.destino);
    return (
      <div className="bg-[#EEEEEE]">
        <div className=' bg-white shadow-xl flex mt-5 gap-5 w-3/4 rounded-lg mb-3 p-10 m-auto'>
          <p>Quantidade: {quantidade}</p>
          <p>
            Origem: {origem.name} - {origem.iata}
          </p>
          <p>
            Destino: {destino.name} - {destino.iata}
          </p>
          <p>Ida: {getDate(dados.ida + " 00:00:00")}</p>
          {dados.volta ? <p>Volta: {getDate(dados.volta + " 00:00:00")}</p> : null}
        </div>
                
          <p>Passagens de Ida: {passagens.ida.map((x) => {
            return mapPassagem(x, dados.id);

          })}</p>
          {dados.volta &&
            <p>Passagens de Volta: {passagens.volta.map((x) => {
              return mapPassagem(x, dados.id);

            })}</p>}
      </div>
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
        cia={passagem.ciaAerea.razao_social}
        preco={passagem.preco}
        dataHoraSaida={passagem.dataHoraSaida}
        dataHoraChegada={passagem.dataHoraChegada}
        link={passagem.linkBusca}
        trechos={passagem.trechos}
        logo = {passagem.ciaAerea.logo}
      />
    );
  }
}
export default Busca;
