import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { postData } from "../Services/apiService";
import Passagem from "../components/Passagem";
import FormBusca from "../components/FormBusca";
import Loading from "../components/Loading";
import SnackBar from "../components/SnackBar";

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

  function submitBusca(data) {
    if (data.volta == "") {
      delete data.volta;
    }
    setResult(null);
    setProcessando(true);
    postData("busca_local", data).then(
      (_) => {
        setProcessando(false);
        setResult(_);
      },
      (_) => {
        console.log(_);
        setProcessando(false);
        setResult({error: _.response.data.message});
      }
    );
  }

  useEffect(() => {
    getDataFromLocation();
    getBuscasApi();
  }, [getDataFromLocation, getBuscasApi]);

  return (
    <div className="bg-[#EEEEEE]">
      <div className="flex items-end mb-36 bg-[url(/images/plane-view.png)] bg-cover h-[70vh]">
        <FormBusca onSubmit={submitBusca} />
      </div>
        {!processando ? result ? parseResult(result) : null : <Loading />}
    </div>
  );

  function parseResult(data) {
    if (data.error) {
      return <SnackBar message={data.error} type="danger" />
    }
    if (data.data.passagens.length == 0) {
      
      return <div className='m-auto text-center text-3xl'>Não foram encontradas passagens com os parâmetros buscados</div>;
      
    }
    const dados = data.data;
    const passagens = dados.passagens;
    return passagens.map((x) => {
      return mapPassagem(x, dados.id);
    });
  }

  function mapPassagem(passagem, id) {
    return (
      <Passagem
        id={id}
        origem={passagem.origem}
        destino={passagem.destino}
        cia={passagem.ciaAerea.nome_fantasia}
        preco={passagem.preco}
        dataIda={passagem.dataIda}
        dataVolta={passagem.dataVolta}
        link={passagem.linkBusca}
        ida={passagem.ida}
        volta={passagem.volta}
        logo={passagem.ciaAerea.logo}
      />
    );
  }
}
export default Busca;
