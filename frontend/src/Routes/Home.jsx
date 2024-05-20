
import { useNavigate } from 'react-router-dom';
import FormBusca from '../components/FormBusca';



function Home() {
  const navigate = useNavigate();
  function handleBusca(data) {
    console.log("Dados obtidos do formulário: ");
    console.log(data);
    navigate("/busca", { state: data });
  }

  return (
    <>
      <FormBusca onSubmit={handleBusca} />

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
    </>
  );
}

export default Home;
