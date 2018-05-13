import * as React from 'react';
import * as PropTypes from 'prop-types';
import './App.css';

import logo from './logo.svg';

class App extends React.Component {
  
  static contextTypes = {
    state: PropTypes.object
  };

  public componentDidMount() {
  }
  
  public render() {
    console.log('App:web3: ', this.context.state);
    
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        </div>
    );
  }
}

export default App;
