import React from "react";

const ProfilePage = () => {
  return (
    <div className="bg-gray-200 p-4">
      <div className="bg-white p-4 rounded-md shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">PROJECT</h1>
          <img src="/path-to-airplane-image.jpg" alt="Airplane" className="w-24 h-auto"/>
        </div>
        <div className="flex items-center space-x-4 mt-4">
          <img src="/path-to-profile-picture.jpg" alt="Profile" className="rounded-full w-16 h-16 border"/>
          <div>
            <p>Nome Completo: João Roberto</p>
            <p>Email: j.roberto@gmail.com</p>
            <p>Telefone: (83) 99977-3300</p>
          </div>
          <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Editar</button>
        </div>

        {/* ABA DE FAVORITOS*/}
        <div className="mt-8">
          <h2>Favoritos</h2>
          {/* Container para os cards */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            {/* Card */}
            { /* Repita este card para cada item favorito */ }
            <div className="bg-white p-4 rounded-md shadow-md flex justify-between items-center">
              {/* Lado Esquerdo - Data e Descrição */}
              <div>
                {/* Data */}
                {/* SUBSTITUIR PELA DATA REAL, OU PELA LOGICA CUIDA THORMES */}
                <span>dd.mm.aaaa</span> 
                {/* Descrição */}
                {/* Substitua 'Descrição aqui' pela descrição real */}
                <p>Descrição aqui</p> 
              </div>

              {/* Lado Direito - Botão Reservar */}
              <button className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-600">Reservar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
