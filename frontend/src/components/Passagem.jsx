import { Link } from "react-router-dom";
import { editData, api_image_base_url } from "../Services/apiService";

function Passagem({ id, origem, destino, cia, preco, dataHoraSaida, dataHoraChegada, link, logo }) {
  return (
    <div className=" bg-slate-400 shadow-sm flex flex-wrap gap-5 w-3/4 rounded-lg mb-3 p-12 m-auto" key={id + origem + destino + cia + ida + volta}>
      <span>
        Origem: {origem.name} - {origem.iata}
      </span>
      <span>
        Destino: {destino.name} - {destino.iata}
      </span>
          <span>Cia Aérea: {cia} <img src={api_image_base_url + logo} className=" w-14" /></span>
      <span className="text-red-800 text-2xl">Preço: R$ {preco}</span>
      <span>Saída: {getDate(dataHoraSaida)}</span>
      <span>Chegada: {getDate(dataHoraChegada)}</span>
      <Link to={link} target="_blank">
        <button
                  onClick={() => { return reservar(link) }}
          className="rounded-full bg-sky-600 text-white px-5 py-1"
        >
          Reservar
        </button>
      </Link>
      <span className={ida.trocaAeroporto ? "text-red-800 text-xl2" : ""}>
        {ida.trocaAeroporto ? "Troca" : ""}
      </span>
    </div>
  );

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
