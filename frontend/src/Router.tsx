import { Route, Routes } from 'react-router-dom';
import App from './App';
import { Teste } from './Teste';

export function Router() {
  return (

      <Routes>
        <Route path='/teste' element={<Teste />}/>
        <Route path='/teste2' element={<App />} />
      </Routes>

  );
}


