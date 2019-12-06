import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from 'react';

import './App.scss';
import api from './api/axios.config';
import Navbar from './shared/components/Navbar/navbar.component';

export default class App extends React.Component {

  componentDidMount() {
    this.getRoles();
  }

  getRoles() {
    console.log('First commit');
    api.get('roles')
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  render() {

    return (
      <Router>
        <section>
          <Navbar />
          <Switch>
            <Route path="/about">
              About
            </Route>
            <Route path="/">
              Home
            </Route>
          </Switch>
        </section>
      </Router>
    );
  }
};
