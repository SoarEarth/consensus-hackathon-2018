import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Web3Provider from './web3-provider';
import App from './App';
import Navigation from './components/navigation';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
// Import default Bootstrap 4 CSS
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Farmer } from './components/Farmer';
import { Warehouse } from './components/Warehouse';
import { Retailer } from './components/Retailer';
import { Buyer } from './components/Buyer';

ReactDOM.render(
  <Web3Provider>
    <Navigation />
    <Router>
      <Switch>
        <Route exact path="/"><App /></Route>
        <Route path="/farmer">{Farmer}</Route>
        <Route path="/warehouse">{Warehouse}</Route>
        <Route path="/retailer">{Retailer}</Route>
        <Route path="/buyer">{Buyer}</Route>
      </Switch>
    </Router>
  </Web3Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
