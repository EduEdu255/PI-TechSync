import { useEffect, useState } from "react";
import { deleteItem, fetchData } from "../../Services/apiService";
import Tooltip from "../../components/Tooltip";
import { Link } from "react-router-dom";
import Loading from '../../components/Loading';

function VooList() {
  const [voos, setVoos] = useState([]);
  const [processando, setProcessando] = useState(false);

    function getVoos() {
      setProcessando(true)
    fetchData("voo").then(
        (_) => {
            setProcessando(false)
        setVoos(_.data);
      },
        (err) => {
          setProcessando(false)
        console.log(err);
      }
    );
  }

  useEffect(() => {
    getVoos();
  }, []);

    function deleteVoo(id) {
      setProcessando(true)
    deleteItem("voo", id).then(
        () => {
        getVoos();
      },
        (err) => {
          setProcessando(false)
        console.log(err);
      }
    );
  }

  return (
    <>
      <div className="flex justify-around w-[60%]">
        <div className="text-3xl text-center m-auto">Voos disponíveis</div>
        <div>
          <Tooltip message="Cadastrar Novo Vôo">
            <Link to="/voo/new">
              <img src="/images/add.svg" className=" h-[32px] w-[32px]"></img>
            </Link>
          </Tooltip>
        </div>
      </div>
      <div className="font-[Rubik] w-[80%] m-auto">
        {processando ? <Loading /> : null}
        {voos.map(mapVoo)}
      </div>
    </>
  );
  function mapHora(horario) {
    const partesHora = horario.split(":");
    const hora = partesHora[0].padStart(2, "0");
    const minutos = partesHora[1].padStart(2, "0");

    return `${hora}:${minutos}`;
  }
  function mapDuracao(duracao) {
    const minutos = duracao % 60;
    const horas = Math.floor(duracao / 60);
    let text = "";
    if (horas > 0) text += horas > 1 ? `${horas} horas ` : `${horas} hora `;
    if (minutos > 0)
      text += minutos > 1 ? `${minutos} minutos` : `${minutos} minuto`;
    return text;
  }
  function mapVoo(voo) {
    return (
      <div
        key={voo.id}
        className=" bg-white grid grid-cols-4 gap-10 shadow-lg rounded-lg p-10 mb-2"
      >
        <span>
          Número: <span className="font-bold">{voo.numero}</span>
        </span>
        <span>
          Cia: <span className="font-bold">{voo.ciaAerea.razaoSocial}</span>
        </span>
        <span>
          Aeronave: <span className="font-bold">{voo.aeronave.marca}</span>
        </span>
        <span>
          Origem: <span className="font-bold">{voo.origem}</span>
        </span>
        <span>
          Destino: <span className="font-bold">{voo.destino}</span>
        </span>
        <span>
          Hora Saída: <span className="font-bold">{voo.saida}</span>
        </span>
        <span>
          Hora Chegada: <span className="font-bold">{voo.chegada}</span>
        </span>
        <span>
          Duração: <span className="font-bold">{mapDuracao(voo.duracao)}</span>
        </span>
        <span>
          Valor:{" "}
          <span className="font-bold">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(voo.valor)}
          </span>
        </span>
        <div className="flex gap-2">
          <Tooltip message="Editar Vôo">
            <Link to={"/voo/" + voo.id}>
              <img src="/images/edit.svg"></img>
            </Link>
          </Tooltip>
          <Tooltip message="Remover Voo">
            <button type="button">
              <img
                src="/images/delete.svg"
                onClick={() => deleteVoo(voo.id)}
              ></img>
            </button>
          </Tooltip>
        </div>
      </div>
    );
  }
}

export default VooList;
