
import FormBusca from '../Componentes/FormBusca';



function Home() {

  function handleBusca(data) {
    console.log("Dados obtidos do formulário: ");
    console.log(data);
  }

  return (
    <div className="bg-gray-300 min-h-screen">
      <nav className="bg-white p-4 rounded-t-lg flex justify-between items-center">
        <div className="text-black font-bold text-xl">Logo da Empresa</div>

        <div className="flex space-x-4">
          <button className="rounded-lg bg-blue-700 text-white px-4 py-2">
            Televendas 0800 616 6161
          </button>
          <button className="rounded-lg bg-blue-700 text-white px-4 py-2">
            Inicie Sessão
          </button>
          <button className="rounded-lg bg-blue-700 text-white px-4 py-2">
            Viagens
          </button>
          <button className="rounded-lg bg-blue-700 text-white px-4 py-2">
            Ajuda
          </button>
        </div>
      </nav>
      <FormBusca onSubmit={handleBusca} />
      {/* Area de comprar, by, eric*/}
      <div className="h-64 bg-cover bg-center flex items-end">
        <div className="bg-black bg-opacity-50 p-4 rounded-lg">
          <h1 className="text-3xl font-bold mb-2">Compre sua Passagem</h1>
          <div className="flex space-x-2">
            <input
              type="date"
              placeholder="Data de Ida"
              className="rounded-lg px-4 py-2 w-1/3"
            />
            <input
              type="date"
              placeholder="Data de Volta"
              className="rounded-lg px-4 py-2 w-1/3"
            />
            <button className="rounded-lg bg-blue-700 text-white px-4 py-2">
              Pesquisar
            </button>
          </div>
        </div>
      </div>

      {/* Propagandas */}
      <section className="bg-white p-4 rounded-lg mt-4">
        <h2 className="text-xl font-bold mb-4">Propagandas</h2>
        {/* ADICIONAR ANUNCIOS AQUI, CUIDA FELIPE*/}
      </section>

      {/* AREA DE COMPRAS*/}
      <section className="bg-white p-4 rounded-lg mt-4">
        <h2 className="text-xl font-bold mb-4">
          Compre tudo para sua viagem com Pousar
        </h2>
        {/* LISTAR PRODUTOS PARA VENDER PARA OS USUARIOS*/}
      </section>

      {/* Informações da Empresa */}
      <section className="bg-white p-4 rounded-lg mt-4">
        <h2 className="text-xl font-bold mb-4">Informações da Empresa</h2>
        {/* Aqui você pode adicionar informações sobre a empresa */}
      </section>

      {/* Inscreva-se para receber ofertas exclusivas */}
      <section className="bg-white p-4 rounded-lg mt-4">
        <h2 className="text-xl font-bold mb-4">
          Inscreva-se para receber ofertas exclusivas
        </h2>
        <div className="flex flex-col md:flex-row items-center">
          <input
            type="email"
            placeholder="Digite seu e-mail"
            className="rounded-lg px-4 py-2 mb-2 md:mr-2 md:mb-0"
          />
          <button className="rounded-lg bg-blue-700 text-white px-4 py-2">
            Quero Recebê-las
          </button>
        </div>
        <p className="text-cinza mt-2">
          Você receberá e-mails promocionais da Pousar. Para mais informações,
          consulte as políticas de privacidade.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white p-4 text-center rounded-b-lg">
        © 2024 POUSAR
      </footer>
    </div>
  );
}

export default Home;
