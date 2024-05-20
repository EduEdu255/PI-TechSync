import styles from "../assets/css/Passagem.module.css"
function Passagem({ origem, destino, cia, preco, ida, volta }) {
    return (
        <div className=' bg-slate-400 shadow-sm flex flex-col flex-wrap gap-5 w-1/2 rounded-lg'>
            <span>Origem: {origem.name} - {origem.iata}</span>
            <span>Destino: {destino.name} - {destino.iata}</span>
            <span>Cia Aérea: {cia} </span>
            <span className={styles.preco }>Preço: R$ { preco }</span>
            <span>Data Ida: {getDate(ida.dataHoraSaida)}</span>
            {volta ? <span>Data Volta: {getDate(volta.dataHoraSaida)}</span> : null}
            <span className={ida.trocaAeroporto ? "text-red-800" : "" }>{ ida.trocaAeroporto ? "Troca" : "" }</span>
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