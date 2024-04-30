import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Teste2 } from './pages/Teste2';
const Routes = () => (
  <Switch>
    <Route exact path="/" component={Teste2} />
    <Route path="/about" component={Teste2} />
  </Switch>
);

export default Routes;
