import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Web3Provider from './web3-provider';
import App from './App';
import Navigation from './components/navigation';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
// Import default Bootstrap 4 CSS
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <Web3Provider>
    <Navigation />
    <App />
  </Web3Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
