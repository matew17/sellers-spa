import React from 'react';
import logo from './logo.svg';
import './App.css';

export default class App extends React.Component {

  getRoles() {
    console.log('First commit');

    fetch('/roles')
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a className="App-link" onClick={() => this.getRoles()}>
            Get roles
        </a>
        </header>
      </div>
    );
  }
}
