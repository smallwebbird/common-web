import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './functions/home';
import Elements from './functions/elements';
import Api from './functions/api';
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
          <Route path="/api">
            <Api />
          </Route>
        </Auth>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
