import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import  Teste  from './pages/Teste';
import  Teste2  from './pages/Teste2';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Teste />} />
        <Route path="/teste2" element={<Teste2 />} />
      </Routes>
    </BrowserRouter>
  );
}
