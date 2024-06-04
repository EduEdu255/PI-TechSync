import { Link } from "react-router-dom";
import { editData, api_image_base_url } from "../Services/apiService";
import { PiAirplaneTakeoff } from "react-icons/pi";
import { PiAirplaneLanding } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import Trechos from "./Trechos";


function Passagem({id, origem, destino, cia, preco, dataIda, dataVolta, link, ida, volta, logo}) {
  const [show, setShow] = useState(false);
  const modalRef = useRef(null);
  


  return (
    <div
      className=" bg-white shadow-xl flex justify-between items-center gap-5 w-3/4 rounded-lg mb-3 p-5 m-auto font-[Rubik]"
      key={id + origem + destino + cia + ida + volta}
    >
      {/* DIV Companhia Aérea (imagem perfil) */}
      <div className="flex gap-5 w-[15%] text-sm">
        <img src={api_image_base_url + logo} className="h-[20px]" />
        <span>{cia}</span>
      </div>

      {/* DIV Dados da passagem */}
      <div className="flex items-center justify-around grow">
        {/* DIV Dados Ida */}
        <div className="flex flex-col justify-between text-sm font-medium text-[#545962]">
          <div className="flex gap-2 items-center uppercase">
            <PiAirplaneTakeoff />
            Ida: {origem}-{destino}
          </div>
          <div className="text-[#343A3D]">{getDate(dataIda)}</div>
          <div className="text-[#767E89] text-[12px] font-[400] flex gap-2">
            <span className="cursor-pointer" onClick={() => setShow(true)}>
              {getHora(ida.dataHoraSaida)} - {getTextParadas(ida.paradas)}
            </span>
            <span>{getDuracao(ida.duracao)}</span>
          </div>
              {show && <Modal ida={<Trechos props={ida.trechos}/>} volta={<Trechos props={volta.trechos}/>} onClose={() => setShow(false)} opened={show} ref={modalRef}/>}
        </div>

        {/* DIV Dados Volta */}
        {volta && (
          <div className="flex flex-col justify-between text-sm font-medium text-[#545962]">
            <div className="flex gap-2 items-center uppercase">
              <PiAirplaneLanding />
              Volta: {destino}-{origem}
            </div>
            <div className="text-[#343A3D]">{getDate(dataVolta)}</div>
            <div className="text-[#767E89] text-[12px] font-[400] flex gap-2">
              <span>
                {getHora(volta.dataHoraSaida)} - {getTextParadas(volta.paradas)}
              </span>
              <span>{getDuracao(volta.duracao)}</span>
            </div>
          </div>
        )}
      </div>
      {/* DIV Com preço e botão reservar */}
      <div className=" flex flex-col p-2 border-s-[#DDE1E8] border-s-[1px] ">
        <div className="border-b-[$DDE1E8] border-b-[1px]">
          <p className="text-sm">A partir de:</p>
          R$ <span className="text-nowrap text-xl">{preco}</span>
        </div>
        <div></div>
        <Link to={link} target="_blank">
          <button
            onClick={() => {
              return reservar(link);
            }}
            className="rounded-full bg-[#3758D0] text-white px-5 mt-2 py-2"
          >
            Reservar
          </button>
        </Link>
      </div>
    </div>
  );
  function getDuracao(duracao) {
    const hours = duracao.match(/PT(\d+)H/);
    const minutes = duracao.match(/PT(\d+H)?(\d+)M/);
    const formattedTime = `${hours ? hours[1] : "0"}h ${
      minutes ? minutes[2] : "00"
    }min`;
    return formattedTime;
  }
  function getDate(date) {
    const data = new Date(Date.parse(date));
    if (!(data instanceof Date)) {
      return "";
    }
    return data.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      weekday: "short",
    });
  }
  function getHora(date) {
    const data = new Date(Date.parse(date));
    if (!(data instanceof Date)) {
      return "";
    }
    return data.toLocaleTimeString("pt-BR", {
      hour: "numeric",
      minute: "numeric",
    });
  }

  function getTextParadas(paradas) {
    if (paradas == 0) {
      return "direto";
    }
    let text = `${paradas}` + (paradas > 1 ? " paradas" : " parada");
    return text;
  }
  function reservar(url) {
    editData("busca/reservar", {}, id).then(
      (_) => {
        console.log(_);
        window.open(url, "_blank");
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

export default Passagem;
