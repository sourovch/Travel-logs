import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div className="container content-wrapper">
      <nav>
        <h1 className="logo">TraveLog</h1>
        <NavLink className="nav-btn" to="/">
          NewsFeed
        </NavLink>{' '}
        <NavLink className="nav-btn" to="/postLog">
          Log A Tour
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
