import { Link } from "react-router-dom";

function Passagem({ origem, destino, cia, preco, ida, volta, link }) {
    return (
        <div className=' bg-slate-400 shadow-sm flex flex-wrap gap-5 w-1/2 rounded-lg mb-3 p-5 m-auto'>
            <span>Origem: {origem.name} - {origem.iata}</span>
            <span>Destino: {destino.name} - {destino.iata}</span>
            <span>Cia Aérea: {cia} </span>
            <span className="text-red-800 text-2xl">Preço: R$ { preco }</span>
            <span>Data Ida: {getDate(ida.dataHoraSaida)}</span>
            <Link to={link} target="_blank"><button className="rounded-full bg-sky-600 text-white px-5 py-1">Reservar</button></Link>
            {volta ? <span>Data Volta: {getDate(volta.dataHoraSaida)}</span> : null}
            <span className={ida.trocaAeroporto ? "text-red-800 text-xl2" : "" }>{ ida.trocaAeroporto ? "Troca" : "" }</span>
        </div>
    )

    function getDate(date) {
        const data = new Date(Date.parse(date));
        if (!(data instanceof Date)) {
            return '';
        }
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    }
}

export default Passagem;