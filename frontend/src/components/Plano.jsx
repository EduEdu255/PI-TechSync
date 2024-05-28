import { useState } from 'react';

function Plano({ dado }) {
    const [clicado, setClicado] = useState(false);

    return (
        <div className={getClassName()} key={dado.id} onClick={cliquei}>
        <h3 className="font-semibold text-3xl mb-4 text-white text-center">{dado.nome}</h3>
        <ul className="text-center">
          <li>
            R$ <span className='font-bold mb-4 text-2xl text-red'>{dado.valor}</span>
          </li>
          <li>
            válido por <span className="text-2xl">{dado.meses_validade}</span>{" "}
            {dado.meses_validade > 1 ? "meses" : "mês"}
          </li>
          <li>
            Valor Por mês <span className="text-2xl">{dado.por_mes}</span>
          </li>
            </ul>
            
      </div>
    );

    function getClassName() {
        return dado.valor >= 500
          ? "w-full sm:w-1/5 p-12 rounded-lg bg-black shadow hover:bg-sky-700 transition-colors duration-1000 ease-in-out text-white"
          : "w-full sm:w-1/5 p-12 rounded-lg bg-indigo-300 shadow hover:bg-sky-700 transition-colors duration-1000 ease-in-out";
    }
    function cliquei() {
        setClicado(!clicado);
    }
}

export default Plano;