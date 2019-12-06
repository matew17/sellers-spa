import { Link } from "react-router-dom";
import React from 'react';

import './navbar.component.scss';

export default function Navbar() {
  return (
    <nav className="navbar-component">
      <ul className="menu-list">
        <li>
          <Link to="/">Sellers</Link>
        </li>
        <li>
          <Link to="/about">A different path</Link>
        </li>
      </ul>
    </nav>
  );
}
