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

      {/* propagandas */}
      <section className="bg-white p-4 rounded-lg mt-4">
        <div className="bg-[#525252] text-center p-7 rounded-none">
          <h2 className="text-[40px] font-light mb-4 text-white">Propagandas</h2>
        </div>
        {/* aqui se adiciona as propagandas */}
      </section>

      {/* area de compra */}
      <section className="bg-white p-4 rounded-lg mt-4">
        <h2 className="text-xl font-bold mb-4">
          Compre tudo para sua viagem com Pousar
        </h2>
        {/* lista de produtos */}
      </section>

      
      <section className="bg-white p-4 rounded-lg mt-4">
        <h2 className="text-xl font-bold mb-4">Informações da Empresa</h2>
        {/* informações da compania */}
      </section>

      
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
