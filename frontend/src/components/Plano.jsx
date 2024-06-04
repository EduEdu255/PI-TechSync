function Plano({ plano, limite, onSelect, selecionado }) {
  return (
    <div
      className={getClassName() + " " + getEscolhido()}
      key={plano.id}
      onClick={onSelect}
    >
      <h3 className={"font-semibold text-3xl mb-4 " + getTextColor()}>
        {plano.nome}
      </h3>
      <p className={"font-normal mb-4 text-xl " + getTextColor()}>
        Válido por {plano.meses_validade}{" "}
        {plano.meses_validade > 1 ? "meses" : "mês"}.
      </p>
      <p className={"font-normal mb-4 text-xl " + getTextColor()}>
        {plano.descricao}
      </p>

      {plano.meses_validade > 1 && (
        <>
          <p className={"font-normal mb-4 text-xl " + getTextColor()}>
            Desconto de{" "}
            {(
              ((99.99 * plano.meses_validade - plano.valor) /
                (plano.meses_validade * 99.99)) *
              100
            ).toFixed(0)}
            %
          </p>
          <p className="font-bold mb-4 text-2xl text-whitetext-xl text-red-500 line-through">
            De {emReais(99.99 * plano.meses_validade)}
          </p>
          <p className={"font-normal mb-4 text-xl " + getTextColor()}>Por</p>
        </>
      )}

      <p
        className={
          "font-bold mb-4 text-3xl text-whitetext-xl " + getTextColor()
        }
      >
        {emReais(plano.valor)}
      </p>
    </div>
  );

  function emReais(valor) {
   let real = Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
   }); 
    return real.format(valor);
  }

  function getClassName() {
    let name = "w-[20%] h-[65vh] p-6 rounded-lg shadow-md w-1/4";
    if (plano.valor >= limite) {
      name += " bg-black";
    } else {
      name += " bg-white";
    }
    return name;
  }

  function getTextColor() {
    return plano.valor >= limite ? "text-white" : "text-black";
  }
  function getEscolhido() {
    return selecionado ? "border-4 border-blue-500" : "";
  }
}

export default Plano;
