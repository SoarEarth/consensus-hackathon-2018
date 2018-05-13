import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Web3Provider from './web3-provider';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Web3Provider>
    <App />
  </Web3Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
