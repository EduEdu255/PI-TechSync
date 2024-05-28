import React from 'react';

const Planos = () => {
    return (
        <div className="bg-gradient-to-r from-purple-900 to-blue-700 text-white h-screen">
          <div className="container mx-auto py-10">
            <h2 className="text-center text-3xl font-bold mb-6">Escolha sua assinatura para melhor empresa.</h2>
            <div className="flex justify-center space-x-4">
              {/* Plano Básico */}
              <div className="bg-white p-6 rounded-lg shadow-md w-1/4">
                <h3 className="font-semibold text-xl text-blackmb-4">Básico</h3>
                {/* Detalhes do plano... */}
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Escolher esse plano</button>
              </div>
              
               {/* Plano Enterprise */}
               <div className="bg-black p-6 rounded-lg shadow-md w-1/4">
                <h3 className="font-semibold text-xl mb-4 text-white">Enterprise</h3>
                {/* Detalhes do plano... */}
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Escolher esse plano</button>
              </div>

              {/* Plano Pro */}
              <div className="bg-white p-6 rounded-lg shadow-md w-1/4">
                <h3 className="font-semibold text-xl text-black mb-4">Pro</h3>
                {/* Detalhes do plano... */}
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Escolher esse plano</button>
              </div>
    
             
            </div>

        {/* Formulário de Informações de Pagamento */}
        <form action="#" method="POST" className="mt-10 bg-white text-gray-700 p-8 rounded-lg shadow-md max-w-md mx-auto">
          <fieldset>
            <legend className="text-center font-bold text-xl mb-6">Escolha a forma de pagamento</legend>

            {/* Campo para número do cartão */}
            <label htmlFor="card-number" className="block mb-2">Número do cartão:</label>
            <input type="text" id="card-number" className="w-full p-2 border rounded-md" />

            {/* Outros campos do formulário, caso queiram colocar, nos oriete com sua sabedoria mestre thormes kkkk */}

            <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Confirmar pagamento</button>
          </fieldset>
        </form>
      </div>

      
    </div>
    
  );
};


export default Planos;
