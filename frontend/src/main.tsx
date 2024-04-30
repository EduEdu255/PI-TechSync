import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Teste } from './pages/Teste';

ReactDOM.render(
  <BrowserRouter>
    <Teste />
  </BrowserRouter>,
  document.getElementById('root')
);
