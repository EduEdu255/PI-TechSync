import { Link } from "react-router-dom";
import { editData, api_image_base_url } from "../Services/apiService";
import { PiAirplaneTakeoff } from "react-icons/pi";
import { PiAirplaneLanding } from "react-icons/pi";
import { findAeroporto } from "../Services/aeroportos"

function Trechos(trechos) {
    console.log(trechos.props)
    return (<div>{trechos.props.map((trecho) => {
        return <div key={trecho.origem}>
            <div>Origem: {findAeroporto(trecho.origem)?.name}</div>
            <div>Destino: {findAeroporto(trecho.destino)?.name}</div>
            <div>Duração: {trecho.duracao}</div>
        </div>
    })}</div>);

    function getDuracao(duracao) {
        const hours = duracao.match(/PT(\d+)H/);
        const minutes = duracao.match(/PT\d+H(\d+)M/);
        const formattedTime = `${hours ? hours[1] : "0"}h ${minutes ? minutes[1] : "00"
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

export default Trechos;
