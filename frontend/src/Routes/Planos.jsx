import React from 'react';
import Icon_Email from "../assets/icon_Email.svg";
import { Link } from 'react-router-dom';
import AdesaoPlanos from './AdesaoPlanos';

const Planos = () => {
    return (
        <div className="bg-gradient-to-r from-purple-900 to-blue-700 text-white h-auto">
          <div className="container mx-auto py-10">
            <h2 className="text-center text-3xl font-bold mb-6">Conheça nossos planos e escolha a melhor opção para sua empresa.</h2>
            <div className="flex justify-center space-x-4">
             
             {/* Plano Enterprise */}
             <div className="bg-black p-6 rounded-lg shadow-md w-1/4">
                <h3 className="font-semibold text-3xl mb-4 text-white">Anual</h3>
                <p className='font-bold mb-4 text-4xl text-white' >R$ 749,99</p>
                <p className='font-normal mb-4 text-xl text-white' >Válido por 12 meses.</p>
                <p className='font-normal mb-4 text-xl text-white' >Nesse plano sua empresa estará economizando, aderindo a essa assinatura você terá um excelente desconto...</p>
                <p className='font-bold mb-4 text-4xl text-whitetext-xl text-red-500 line-through' >De R$ 99,99</p>
                <p className='font-normal mb-4 text-xl text-white' >Por</p>
                <p className='font-bold mb-4 text-5xl text-whitetext-xl text-white' >R$ 62,50/mês</p>
                
              </div>

              {/* Plano Semestral */}
              <div className="bg-white p-6 rounded-lg shadow-md w-1/4">
                <h3 className="font-semibold text-3xl mb-4 text-black text-blackmb-4">Semestral</h3>
                <p className='font-bold mb-4 text-4xl text-black' >R$ 399,99</p>
                <p className='font-normal mb-4 text-xl text-black' >Válido por 06 meses.</p>
                <p className='font-normal mb-4 text-xl text-black' >Nesse plano sua empresa estará economizando, aderindo a essa assinatura você terá um excelente desconto...</p>
                <p className='font-bold mb-4 text-4xl text-whitetext-xl text-red-500 line-through' >De R$ 99,99</p>
                <p className='font-normal mb-4 text-xl text-black' >Por</p>
                <p className='font-bold mb-4 text-5xl text-whitetext-xl text-black' >R$ 66,66/mês</p>                
              </div>
              

              {/* Plano Trimestral */}
              <div className="bg-white p-6 rounded-lg shadow-md w-1/4">
                <h3 className="font-semibold text-3xl mb-4 text-black text-blackmb-4">Trimestral</h3>
                <p className='font-bold mb-4 text-4xl text-black' >R$ 249,99</p>
                <p className='font-normal mb-4 text-xl text-black' >Válido por 03 meses.</p>
                <p className='font-normal mb-4 text-xl text-black' >Nesse plano sua empresa estará economizando, aderindo a essa assinatura você terá um excelente desconto...</p>
                <p className='font-bold mb-4 text-4xl text-whitetext-xl text-red-500 line-through' >De R$ 99,99</p>
                <p className='font-normal mb-4 text-xl text-black' >Por</p>
                <p className='font-bold mb-4 text-5xl text-whitetext-xl text-black' >R$ 83,33/mês</p>
              </div>

              {/* Plano Mensal */}
              <div className="bg-white p-6 rounded-lg shadow-md w-1/4">
              <h3 className="font-semibold text-3xl mb-4 text-black text-blackmb-4">Mensal</h3>
                <p className='font-bold mb-4 text-4xl text-black' >R$ 99,99</p>
                <p className='font-normal mb-4 text-xl text-black' >Válido por 30 dias.</p>
                <p className='font-normal mb-4 text-xl text-black' >Conheça nossos serviços através do nosso plano mensal, você teŕa amplo acesso a nossos srviços.</p>
                <p className='font-normal mb-4 text-xl text-black' >Adiquira por</p>
                <p className='font-bold mb-4 text-5xl text-whitetext-xl text-black' >R$ 99,99/mês</p>
              </div>
    
            </div>

            <div className='mt-10 p-8  max-w-md mx-auto flex items-center justify-center'>
          <Link to={"/cia/Adesao-planos"}>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 align-middle justify-center"> Clique aqui para aderir seu plano...</button>
            </Link>
            </div>
        
      </div>
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
};


export default Planos;
