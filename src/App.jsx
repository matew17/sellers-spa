import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from 'react';

import './App.scss';
import AddSeller from './features/sellers/components/AddSeller/add-seller.component';
import Navbar from './shared/components/Navbar/navbar.component';
import Sellers from './features/sellers/sellers.component';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <section>
          <Navbar />
          <Switch>
            <Route path="/add-seller">
              <AddSeller />
            </Route>
            <Route path="/">
              <Sellers />
            </Route>
          </Switch>
        </section>
      </Router>
    );
  }
};
