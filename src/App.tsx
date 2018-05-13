import * as React from 'react';
import * as PropTypes from 'prop-types';
import Admin from './components/admin';
import './App.css';
import { Container } from 'reactstrap';

import logo from './logo.svg';

class App extends React.Component {

  public render() {
    return (
      <Container>
        <Admin/>
      </Container>
    );
  }
}

export default App;
