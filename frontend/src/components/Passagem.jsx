import { Link } from "react-router-dom";
import { editData, api_image_base_url } from "../Services/apiService";

function Passagem({ id, origem, destino, cia, preco, dataHoraSaida, dataHoraChegada, link, logo }) {
  return (
    <div className=" bg-white shadow-xl flex  gap-5 w-3/4 rounded-lg mb-3 p-10 m-auto" key={id + origem + destino + cia + ida + volta}>
      <div>
        <span>Cia Aérea: {cia} <img src={api_image_base_url + logo} className=" w-14" /></span>
      </div>
      <div>
        <div className="flex justify-between font-medium text-[#343A3D]">
          <span>
            Origem: {origem.name} - {origem.iata}
          </span>
          <span>
            Destino: {destino.name} - {destino.iata}
          </span>

        </div>
        <div className="flex  w[80%] gap-20 mt-5 font-semibold">
          <span>Saída: {getDate(dataHoraSaida)}  </span>
          <span>Chegada: {getDate(dataHoraChegada)}  </span>
        </div>

      </div>
      <div className="bg-gray-500 w-[2px]"></div>
      <div className=" flex flex-col  p-2 ">
        <h3 className="font-semibold">Por apenas:</h3>
        <span className="text-green-600 font-semibold text-nowrap text-xl">R$ {preco}</span>
        <Link to={link} target="_blank">
          <button
                    onClick={() => { return reservar(link) }}
            className="rounded-full bg-sky-600 text-white px-5 mt-2 py-1"
          >
            Reservar
          </button>
        </Link>
      </div>
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
