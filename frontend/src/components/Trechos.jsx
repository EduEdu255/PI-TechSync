import { FaRegClock } from "react-icons/fa";

import { findAeroporto } from "../Services/aeroportos";

function Trechos({ ciaNome, ciaImg, trechos }) {
  console.log(trechos);
  return (
    <div className="flex gap-5 flex-col w-full justify-between text-sm font-[400] text-black">
      {trechos.map((trecho) => {
        return mapTrecho(trecho);
      })}
    </div>
  );

  function mapTrecho(trecho) {
    return (
      <>
        {/* DIV Espera */}
        {trecho.espera && (
          <div className="flex gap-1 items-center justify-center rounded-md bg-gray-200 border-dashed border-2 border-gray-500">
            <FaRegClock />
            <p>
              Espera de {getDuracao(trecho.espera)} em{" "}
              {findAeroporto(trecho.origem).name}
            </p>
          </div>
        )}
        <div
          key={trecho.origem}
          className="flex flex-col gap-1 justify-between border-[1px] border-gray-500 rounded-lg p-2"
        >
          {/* DIV Cia e Aeronave */}
          <div className="flex justify-between items-center border-b-[1px]">
            <div className="flex items-center gap-5 w-[15%] text-sm">
              <img src={ciaImg} className="h-[50px]" />
              <span>{ciaNome}</span>
            </div>
            <div className="flex flex-col">
              <p>Voo nº {trecho.numero}</p>
              <p>{trecho.aeronave}</p>
            </div>
          </div>
          {/* DIV  Dados Trecho */}
          <div className="grid grid-cols-3 place-items-center py-10 px-5">
            {/* Div Saída */}
            <div className="flex flex-col gap-1 uppercase items-center">
              <span>
                {trecho.proximoDia && <span className="text-red-500">+1 </span>}
                {getDate(trecho.horaSaida)}
              </span>
              <span className="text-2xl font-medium">
                {getHora(trecho.horaSaida)}
              </span>
              <span>{findAeroporto(trecho.origem).iata}</span>
              <span>{findAeroporto(trecho.origem).name}</span>
            </div>
            {/* Div Duração */}
            <div className="flex flex-col justify-center">
              <p>Duração</p>
              <p className="font-bold">{getDuracao(trecho.duracao)}</p>
            </div>
            {/* Div Chegada */}
            <div className="flex flex-col gap-1 uppercase items-center">
              <span>{getDate(trecho.horaChegada)}</span>
              <span className="text-2xl font-medium">
                {getHora(trecho.horaChegada)}
              </span>
              <span>{findAeroporto(trecho.destino).iata}</span>
              <span>{findAeroporto(trecho.destino).name}</span>
            </div>
          </div>
        </div>
      </>
    );
  }

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
}

export default Trechos;
