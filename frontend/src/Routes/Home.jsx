import { useNavigate } from "react-router-dom";
import FormBusca from "../components/FormBusca";
import Icon_Email from "../assets/icon_Email.svg";

function Home() {
  const navigate = useNavigate();

  function handleBusca(data) {
    console.log("Dados obtidos do formulário: ");
    console.log(data);
    navigate("/busca", { state: data });
  }

  return (
    <div className="bg-[#EEEEEE]">
      <div className="flex items-end mb-36 bg-[url(/images/plane-view.png)] bg-cover h-[70vh]">
        <FormBusca onSubmit={handleBusca} />
      </div>

      {/* propagandas */}
      <section className="bg-white w-full rounded-lg mt-4">
        <div className="bg-[#525252] w-full text-center p-7 rounded-none">
          <h2 className="text-[40px] font-light mb-4 text-white">
            Propagandas
          </h2>
        </div>
        {/* aqui se adiciona as propagandas */}
      </section>

      {/* area de compra */}
      <section className="justify-center flex-col items-center  flex p-4 rounded-lg mt-4 w-full">
        <div className="  w-[60%] ">
          <h2 className="text-xl text-[#343A3D] font-bold mb-4">
            Compre tudo para sua viagem com Pousar
          </h2>
        </div>
        <div className="flex justify-between h-full  w-[60%] ">
          <div className="flex flex-col min-h-full p-10 bg-white max-w-[30%] rounded-2xl shadow-lg">
            <h2 className="text-[14px] text-[#343A3D] font-bold mb-4">
              Como encontrar passagens na Pousar?
            </h2>
            <p className="text-[12px]">
              Na Pousar, encontre tudo para suas férias. Insira os dados da
              viagem no buscador, compare opções e clique em "Comprar". Você
              será redirecionado ao site da companhia aérea parceira, onde
              cadastrará os dados dos passageiros e selecionará o meio de
              pagamento. Por último, clique novamente em "Comprar" e receba os
              vouchers por e-mail.{" "}
            </p>
          </div>
          <div className="flex flex-col min-h-full p-10 bg-white max-w-[30%] rounded-2xl shadow-lg">
            <h2 className="text-[14px] text-[#343A3D] font-bold mb-4">
              A Pousar é uma empresa confiável?
            </h2>
            <p className="text-[12px]">
              Sim, a Pousar é confiável. Trabalhamos com companhias aéreas
              parceiras estabelecidas e respeitáveis. Além disso, nossa
              plataforma oferece um ambiente seguro para realizar reservas de
              passagens aéreas. Estamos comprometidos em fornecer uma
              experiência de viagem confiável e satisfatória para todos os
              nossos clientes.
            </p>
          </div>

          <div className="flex flex-col min-h-full p-10 bg-white max-w-[30%] rounded-2xl shadow-lg">
            <h2 className="text-[14px] text-[#343A3D] font-bold mb-4">
              Por que devo escolher a Pousar para a minha viagem?
            </h2>
            <p className="text-[12px]">
              Escolha a Pousar para sua viagem e tenha acesso a uma ampla
              variedade de voos das melhores companhias aéreas. Compare, reserve
              e aproveite ofertas especiais de forma fácil e segura. Contamos
              com um atendimento ao cliente dedicado para garantir sua
              satisfação.{" "}
            </p>
          </div>
        </div>
        {/* lista de produtos */}
      </section>

      <section className=" justify-center flex p-4 rounded-lg mt-4 w-full">
        <div className="flex flex-col h-full p-10 bg-white max-w-[60%] rounded-2xl shadow-lg">
          <h2 className="text-2xl text-[#343A3D] font-bold mb-4">
            Faça sua jornada com maior segurança e agilidade
          </h2>
          {/* informações da compania */}
          <p>
            A Pousar é uma empresa inovadora que facilita a busca e a compra de
            passagens aéreas, conectando viajantes às melhores ofertas de
            companhias aéreas parceiras. <br />
            Nosso site funciona como um marketplace, onde diversas empresas de
            aviação listam suas passagens, oferecendo aos nossos usuários uma
            ampla gama de opções de voo. Nosso objetivo é tornar a experiência
            de busca de passagens mais simples, rápida e eficiente. <br />
            Com uma interface amigável e intuitiva, os usuários podem facilmente
            comparar preços, horários e rotas, encontrando a melhor opção que
            atenda às suas necessidades de viagem. Além disso, na Pousar,
            garantimos segurança e transparência em todas as transações.
            Trabalhamos com parceiros confiáveis e estabelecidos no mercado,
            proporcionando uma experiência de compra tranquila e confiável.{" "}
            <br /> Seja para viagens de negócios ou lazer, nacionais ou
            internacionais, a Pousar é a plataforma ideal para você encontrar as
            passagens aéreas que procura. Conecte-se com as melhores ofertas e
            decole com a Pousar!
          </p>
        </div>
      </section>

      <section className="bg-white flex flex-col items-center p-4 rounded-lg mt-4">
        <div className="flex items-center gap-5">
          <div>
            <img src={Icon_Email} />
          </div>
          <div className=" w-[500px]">
            <h2 className="text-[18px] text-[#343A3D] font-bold mb-4">
              Inscreva-se para receber ofertas exclusivas
            </h2>
            <div className="flex gap-1  w-full  flex-col md:flex-row items-center">
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="rounded-lg px-4 py-2 w-[350px] border border-gray-500 mb-2 md:mr-2 md:mb-0"
              />
              <button className="rounded-full border border-blue-700 text-blue-700 text-sm font-semibold p-2 ">
                Quero Recebê-las
              </button>
            </div>
            <p className="text-gray-500 text-[12px] text-wrap w-96 mt-2">
              Você receberá e-mails promocionais da Pousar. Para mais
              informações, consulte as políticas de privacidade.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;