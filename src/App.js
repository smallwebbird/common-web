import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './functions/home';
import Elements from './functions/elements';
import Auth from './components/auth';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Auth>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/elements">
            <Elements />
          </Route>
        </Auth>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
