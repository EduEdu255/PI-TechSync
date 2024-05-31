import { useEffect, useState } from "react";
import { deleteItem, fetchData } from "../../Services/apiService";
import Tooltip from "../../components/Tooltip";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { MdAddCircleOutline } from "react-icons/md";
import ConfirmationDialog from '../../components/ConfirmationDialog';
import { PiAirplaneTakeoff } from "react-icons/pi";
import { PiAirplaneLanding } from "react-icons/pi";
import { FaRegClock } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { MdAttachMoney } from "react-icons/md";
import { BsAirplaneEngines } from "react-icons/bs";
import { MdOutlineWorkOutline } from "react-icons/md";










function VooList() {
  const [voos, setVoos] = useState([]);
  const [processando, setProcessando] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [flightToDeleteId, setFlightToDeleteId] = useState(null);

  function getVoos() {
    setProcessando(true);
    fetchData("voo").then(
      (_) => {
        setProcessando(false);
        setVoos(_.data);
      },
      (err) => {
        setProcessando(false);
        console.log(err);
      }
    );
  }
  function handleDeleteClick(id) {
    setIsConfirmationOpen(true);
    setFlightToDeleteId(id);
  }

  function handleConfirmation(confirmed) {
    if (confirmed) {
      deleteVoo(flightToDeleteId);
    } else {
      setFlightToDeleteId(null);
      setIsConfirmationOpen(false);
    }
  }

  useEffect(() => {
    getVoos();
  }, []);

  function deleteVoo(id) {
    setProcessando(true);
    deleteItem("voo", id).then(
      () => {
        getVoos();
      },
      (err) => {
        setProcessando(false);
        console.log(err);
      }
    );
    setFlightToDeleteId(null);
    setIsConfirmationOpen(false);
  }

  return (
    <div className="bg-[#EEE]">
      <div className="flex flex-col justify-center align-middle">
        <div className="flex m-auto gap-12 items-center">
          <div className="text-[40px] text-center m-10 font-bold text-[#3758D0]">
            Vôos disponíveis
          </div>
          <div>
            <Tooltip message="Cadastrar Novo Vôo">
              <Link to="/cia/voo/new" className="flex bg-[#3758D0] border-2 text-white px-3 py-2 rounded-md items-center gap-2 hover:bg-[#EEEE] hover:text-[#3758D0] hover:border-2 hover:border-[#3758D0] transition">
                <p>
                  Cadastrar
                </p>
                <MdAddCircleOutline
                  size={"2em"}
                  style={{ verticalAlign: "middle",  }}
                />
              </Link>
            </Tooltip>
          </div>
        </div>
        <div className="font-[Rubik] w-[80%] m-auto">
          {processando ? <Loading /> : null}
          {voos.map(mapVoo)}
        </div>
        {isConfirmationOpen && (
          <ConfirmationDialog
            message="Tem certeza que deseja apagar esse vôo? Essa ação não poderá ser revertida!"
            onConfirm={handleConfirmation}
            onCancel={() => handleConfirmation(false)}
          />
        )}
      </div>
    </div>
  );

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
          <span className="flex gap-2 items-center">
            Número: <span className="font-bold">{voo.numero}</span>
          </span>
          <span className="flex gap-2 items-center">
            <MdOutlineWorkOutline />

            Cia: <span className="font-bold">{voo.ciaAerea.razaoSocial}</span>
          </span>
          <span className="flex gap-2 items-center">
            <BsAirplaneEngines />
            Aeronave: <span className="font-bold">{voo.aeronave.marca}</span>
          </span>
          <span className=" flex gap-2 items-center">
            <FiMapPin />
            Origem: <span className="font-bold">{voo.origem}</span>
          </span>
          <span className=" flex gap-2 items-center">
            <FiMapPin />
            Destino: <span className="font-bold">{voo.destino}</span>
          </span>
          <span className="flex gap-2 items-center">
            <PiAirplaneTakeoff />
            Hora Saída: <span className="font-bold">{voo.saida}</span>
          </span>
          <span className="flex gap-2 items-center">
            <PiAirplaneLanding />
            Hora Chegada: <span className="font-bold">{voo.chegada}</span>
          </span>
          <span className="flex gap-2 items-center">
            <FaRegClock />
            Duração:{" "}
            <span className="font-bold">{mapDuracao(voo.duracao)}</span>
          </span>
          <span className="flex gap-2 items-center">
            <MdAttachMoney />
            Valor:{" "}
            <span className="font-bold text-green-600">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(voo.valor)}
            </span>
          </span>
          <div className="flex gap-2">
            <Tooltip message="Editar Vôo">
              <Link to={"/cia/voo/" + voo.id}>
                <img src="/images/edit.svg"></img>
              </Link>
            </Tooltip>
            <Tooltip message="Remover Voo">
              <button
                type="button"
                onClick={() => handleDeleteClick(voo.id)}
                disabled={processando}
              >
                <img src="/images/delete.svg"></img>
              </button>
            </Tooltip>
          </div>
        </div>
      
    );
  }
}

export default VooList;
