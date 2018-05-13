import * as React from 'react';
import * as PropTypes from 'prop-types';
import Overview from './components/overview';
import './App.css';
import { Container } from 'reactstrap';

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
      <Container>
        <Overview/>
      </Container>

    );
  }
}

export default App;
