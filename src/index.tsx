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
import Farmer from './components/Farmer';
import Warehouse from './components/Warehouse';
import Retailer from './components/Retailer';
import Buyer from './components/Buyer';
import Admin from './components/admin';


export const RouteMap: React.StatelessComponent<{}> = () => (
  <div>
    <Switch>
      <Route exact path="/"><App /></Route>
      <Route path="/farmer" render={(props) => <Farmer {...props} />} />
      <Route path="/warehouse" render={(props) => <Warehouse {...props} />} />
      <Route path="/retailer" render={(props) => <Retailer {...props} />} />
      <Route path="/buyer" render={(props) => <Buyer {...props} />} />
    </Switch>
  </div>
);

ReactDOM.render(
  <Web3Provider>
    <Navigation />
    <Router><RouteMap /></Router>
  </Web3Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
