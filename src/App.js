import React, { Component } from 'react';


import './App.css';
import Nav from './components/nav';
import Routes from './route';

class App extends Component {
  render() {
    return (
      <div className="App">

        <p>hai</p>
        <Nav />
        <Routes />
        
      </div>
    );
  }
}

export default App;
