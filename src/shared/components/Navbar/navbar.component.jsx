import { Link } from "react-router-dom";
import React from 'react';

import './navbar.component.scss';

export default function Navbar() {
  return (
    <nav className="navbar-component">
      <Link to="/">Sellers SPA</Link>

      <ul className="menu-list">
        <li>
          <Link to="/add-seller">Create</Link>
        </li>
      </ul>
    </nav>
  );
}
